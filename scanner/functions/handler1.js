function handler1(req, res, next){
      res.setHeader('x-user-id', String(req.params.id));
      next()
    }