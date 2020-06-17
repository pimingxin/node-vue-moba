// 在app引用此文件 拿到app实例 在这文件里定义中间件
// 修改成通用接口 
module.exports = app => {
  let captchaTxt
  const express = require('express')
  const svgCaptcha = require('svg-captcha')
  const router = express.Router({
    mergeParams: true // 为了获取到下面的动态参数
  })

  const assert = require('http-assert')
  const jwt = require('jsonwebtoken')


  router.post('/', async (req, res) => {
    const model = await req.Model.create(req.body)
    res.send(model)
  })

  router.get('/', async (req, res) => {
    // 判断特殊情况 不是所有接口都需要使用关联 populate
    const queryOptions = {}
    if (req.Model.modelName === 'Category') {
      // 数据库模型的名字 导出的数据库定义的名称
      queryOptions.populate = 'parent'
    }
    const items = await req.Model.find().setOptions(queryOptions).limit(100) // populate关联查询 选择一个数据库的字段 关联查询 如果不添加parent  parent这个字段就只是关联到的父级的字符串 获取不到父级的名称 添加之后就可以获取到关联字段的父级的整个对象
    res.send(items)
  })

  router.get('/:id', async (req, res) => {
    const model = await req.Model.findById(req.params.id)
    res.send(model)
  })

  router.put('/:id', async (req, res) => {
    const model = await req.Model.findByIdAndUpdate(req.params.id, req.body)
    res.send(model)
  })

  router.delete('/:id', async (req, res) => {
    await req.Model.findByIdAndDelete(req.params.id, req.body)
    res.send({
      success: true
    })
  })

  const authMiddleware = require('../../middleware/auth')

  const resourceMiddleware = require('../../middleware/resource')

  // 请求的参数:resource传过来 通过inflection 查找到对应的数据库模型 从数据库中操作再返回 通用CURD接口
  app.use('/admin/api/rest/:resource', authMiddleware(), resourceMiddleware(), router)

  const multer = require('multer')
  // dest目标文件夹 
  const upload = multer({ dest: __dirname + '/../../uploads' })
  // 经过multer中间件 然后使用到需要上传图片文件的地方upload.single 上传单个文件 参数写发请求带的参数
  app.post('/admin/api/upload', authMiddleware(), upload.single('file'), async (req, res) => {
    const file = req.file
    file.url = `http://localhost:3000/uploads/${file.filename}`
    res.send(file)
  })


  // 登录接口
  app.post('/admin/api/login', async (req, res) => {
    // 根据用户名找用户
    const { username, password, captcha } = req.body

    if (username === "") {
      return res.status(422).send({
        message: '请输入用户名'
      })
    }

    if (!password) {
      return res.status(422).send({
        message: '请输入密码'
      })
    }

    if (!captcha === "") {
      return res.status(422).send({
        message: '请输入验证码'
      })
    }
    // 因为需要从数据库请求数据 所以必须为异步请求 
    const AdminUser = require('../../models/AdminUser')
    // 因为在AdminUser模型中设置了password为select为false 想要获取值的话需要添加方法
    const user = await AdminUser.findOne({ username }).select('+password')
    // 使用http-assert 简写判断
    
    assert(user, 422, '用户名不存在')
    // if (!user) {
    //   return res.status(422).send({
    //     message: '用户名不存在'
    //   })
    // }

    // 校验密码
    const userPassWord = require('bcrypt').compareSync(password, user.password)
    assert(userPassWord, 422, '密码错误')
    // if (!userPassWord) {
    //   return res.status(422).send({
    //     message: '密码错误'
    //   })
    // }

    if (captcha !== captchaTxt) {
      return res.status(422).send({
        message: '验证码错误'
      })
    }

    // 返回token

    const token = jwt.sign({
      id: user._id
    }, app.get('token'))

    res.send({ token })
  })
  
  app.get('/admin/api/captcha', (req, res) => {
    let captcha = svgCaptcha.create({
      ignoreChars: '0o1i',
      size: 1,
      noise: 8
    })
    captchaTxt = captcha.text;
    res.type('svg')
    res.status(200).send(captcha.data)
  })

  // 错误处理函数
  app.use(async (err, req, res, next) => {
    // console.log(err)
    res.status(err.status || 500).send({
      message: err.message
    })

  })
}