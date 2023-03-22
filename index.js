const express = require('express')

require('dotenv').config()
require('./db')

const listRouter = require('./router/list.router')
//const todoRouter = require ('./router/todo.router')
//const authRouter = require('./router/auth.router')
const PORT = process.env.PORT || 3000
const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use('/list', listRouter)
//app.use('/todo', todoRouter)
//app.use('/auth', authRouter)
app.use((err, req, res, next) => {
res.status(500).json({message : err})

})

app.use((req, res, next) => {
    res.status(404).json({message : "not found : check the url !"})
})













app.listen(PORT, ()=> {
  console.log(`=> server launched on port : ${PORT}`)
})