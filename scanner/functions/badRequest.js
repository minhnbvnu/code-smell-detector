function badRequest(res) {  
            res.writeHead(400, {
                "Content-Length": 12
            });
            res.end('Bad Request\n');
        }