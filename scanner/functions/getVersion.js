function getVersion(req, res, next){
        res.json({"version": process.env.npm_package_version})

    }