module.exports = options => {
  return async (req, res, next) => {
    const modelName = require('inflection').classify(req.params.resource)
    // 在请求上 挂载 一个mongodb模型 
    req.Model = require(`../models/${modelName}`)
    next()
  }
}


