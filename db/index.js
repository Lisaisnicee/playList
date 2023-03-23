const mongoose = require('mongoose')
require('dotenv').config()
const playList = require('../model/playList.model');
const User = require('../model/user.model')
const MONGO_URI = process.env.MONGO_URI


mongoose
  .connect(MONGO_URI)
  .then((x) => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })

  .catch((err) => {
    console.error('Error connecting to mongo: ', err)
  })

module.exports=mongoose