function basicAuth(checker, realm) {

        realm = realm || 'Authorization Required';
        
        function unauthorized(res) {
            res.writeHead(401, {
                'WWW-Authenticate': 'Basic realm="' + realm + '"',
                'Content-Length': 13
            });
            res.end("Unauthorized\n");
        }

        function badRequest(res) {  
            res.writeHead(400, {
                "Content-Length": 12
            });
            res.end('Bad Request\n');
        }

        return function(req, res, next) {
            var authorization = req.headers.authorization;
            if (!authorization) return unauthorized(res);
            var parts = authorization.split(' ');
            var scheme = parts[0];
            var credentials = new Buffer(parts[1], 'base64').toString().split(':');
            if ('Basic' != scheme) return badRequest(res);
            checker(req, credentials[0], credentials[1], function (user) {
                if (!user) return unauthorized(res);
                req.remoteUser = user;
                next();
            });
        }
    }