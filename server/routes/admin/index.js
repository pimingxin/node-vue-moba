// 在app引用此文件 拿到app实例 在这文件里定义中间件
module.exports = app => {
  const express = require('express')
  const router = express.Router()
  const Category = require('../../models/Category')
  // 新建分类
  router.post('/categories', async (req,res) => {
    const model = await Category.create(req.body)
    res.send(model)
  })

  // 获取全部分类
  router.get('/categories', async (req,res) => {
    const items = await Category.find().populate('parent').limit(10) // populate关联查询 选择一个数据库的字段 关联查询 如果不添加parent  parent这个字段就只是关联到的父级的字符串 获取不到父级的名称 添加之后就可以获取到关联字段的父级的整个对象
    res.send(items)
  })

  // 获取单个分类
  router.get('/categories/:id', async (req,res) => {
    const model = await Category.findById(req.params.id)
    res.send(model)
  })

  // 更改单个分类
  router.put('/categories/:id', async (req,res) => {
    const model = await Category.findByIdAndUpdate(req.params.id, req.body)
    res.send(model)
  })

  // 删除单个分类
  router.delete('/categories/:id', async (req,res) => {
    await Category.findByIdAndDelete(req.params.id, req.body)
    res.send({
      success: true
    })
  })

  // use 对这个/admin/api发起的请求 会先经过这个中间件
  app.use('/admin/api', router)
}