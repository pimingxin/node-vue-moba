const express = require("express")

const app = express()

app.use(require('cors')())
app.use(express.json())

app.set('token', '123')

// 在node里面 想要在页面显示一个东西 必须使用静态文件托管
app.use('/uploads', express.static(__dirname + '/uploads'))

require('./plugins/db')(app)
require('./routes/admin')(app)
require('./routes/web')(app)

app.listen(3000, () => {
  console.log('http://localhost:3000')
})