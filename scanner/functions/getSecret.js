function getSecret(req, res){
        res.json({secret: process.env.SECRET_KEY})
    }