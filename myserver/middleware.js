const jwt = require('jsonwebtoken');


// decode the token

module.exports = function(req,res,next){
    try{
            let token = req.header('x-token');

            if(!token){
                return res.status(400).send('Token Not Found');
            }
            let decode = jwt.verify(token,'jwtsecret');
            // let payload ={
            //     user:{
            //         id:exist.id
            //     }
            //              }
            req.user = decode.user
            next();
    }
    catch(err){
            console.log(err);
            return res.status(500).send('servet Error in middleWare')
    }
}