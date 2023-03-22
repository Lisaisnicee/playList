const mongoose = require('mongoose')
require('dotenv').config()

const data = require('../data');
const List = require('../model/list.model');
const MONGO_URI = process.env.MONGO_URI


mongoose
  .connect(MONGO_URI)
  .then((x) => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })

  .then(
    
    async () => {
      const ans = await List.insertMany(data)
      await action(data)
      //mongoose.connection.close();
 
  })
  .catch((err) => {
    console.error('Error connecting to mongo: ', err)
  })

module.exports=mongoose