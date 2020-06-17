const mongoose = require('mongoose')
// 分类模型
const schema = new mongoose.Schema({
  name: {type: String},
  parent: {type: mongoose.SchemaTypes.ObjectId, ref: 'Category'} // 定义父级的类型 这里不能是String 同时还需要设置ref 来选择的关联模型 寻找上级分类的时候 定义好ref方便知道去哪里找这个上级分类
})

schema.virtual('children' , {
  localField: '_id',
  foreignField: 'parent',
  justOne: false,
  ref: 'Category'
})

schema.virtual('children' , {
  localField: '_id',
  foreignField: 'categories',
  justOne: false,
  ref: 'Article'
})

module.exports = mongoose.model('Category', schema,'categories')