const router = require('express').Router()
const User = require('../model/user.model')
const bcrypt = require('bcrypt')
const bodyParser = require('body-parser');

const { required } = require('nodemon/lib/config');
const saltRounds = 10;


router.use(bodyParser.urlencoded({ extended: false }))


router.post('/login',(req, res, next)=> {
    console.log(req.body)

    bcrypt.genSalt(saltRounds, function(err, salt) {
        bcrypt.hash(req.body.password, salt, function(err, hash) {
            console.log(hash)
        });
    });
    res.status(200).json(req.body)

})



router.post('/users', async (req, res, next)=> {
    try {
         if(!("email" in req.body && "password" in req.body)) {

            return res.status(422).json({message : "need an email and password"})
         }
        const ans = await User.create(req.body)
        const saveAns = await ans.save();
        res.status(201).json(saveAns)

    }
    catch(error) {
        next(error)
    }
})

router.get('/users', async (req, res, next) => {
    try {
      const users = await User.find({});
      res.status(200).json(users);
    } catch (error) {
      next(error);
    }
  });


  router.get('/users/:id', async (req, res, next) => {

    const userId = req.params.id;

    try {
      const user = await User.findById(userId);
      res.send(user);
      res.status(200).json(user);
    } catch (error) {

      next(error);
    }
  });


  router.delete('/users/:id', async (req, res, next) => {
    const userId = req.params.id;
  
    try {
      const user = await User.findByIdAndDelete(userId);
  
      if (!user) {
        return res.status(404).json({ message: "L'utilisateur que vous cherchez à supprimer est introuvable" });
      }
  
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  });
  


module.exports = router;


























module.exports = router;
