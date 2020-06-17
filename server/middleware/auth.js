module.exports = options => {
  return async (req, res, next) => {

  const jwt = require('jsonwebtoken')
  const AdminUser = require('../models/AdminUser')
  const assert = require('http-assert')
    // use 对这个/admin/api发起的请求 会先经过这个中间件
    // 登录校验中间件
    // 前端axios请求中 设置请求拦截器 在headers中添加authorization字段 将前面存在localStorage中的token发送到后端
    const token = String(req.headers.authorization || '').split(' ')[1]
    assert(token, 401, '请先登录')
    // 解析token

    const { id } = jwt.verify(token, req.app.get('token'))
    assert(id, 401, '请先登录')
    // 通过token找

    // 挂载到req上是为了让后面的能使用 挂载到req res 都可以
    req.user = await AdminUser.findById(id)

    assert(req.user, 401, '请先登录')
    await next()
  }
}