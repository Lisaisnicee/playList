const router = require('express').Router()
const User = require('../model/user.model')
const bcrypt = require('bcrypt')




const bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: false }))

const { required } = require('nodemon/lib/config');
const saltRounds = 10;


router.post('/login',(req, res, next)=> {
    console.log(req.body)
    
    
    bcrypt.genSalt(saltRounds, function(err, salt) {
        bcrypt.hash(req.body.password, salt, function(err, hash) {
            console.log(hash) 
        });
    });
    res.status(200).json(req.body)
 
})


router.post('/login', async (req, res, next)=> {
    try {
         if(!("email" in req.body && "password" in req.body)) {

            return res.status(422).json({message : "need an email and password"})
         }
        const ans = await User.create(req.body)
        res.status(201).json(ans)

    }
    catch(error) {
        next(error)
    }
})







module.exports = router;


























module.exports = router;
