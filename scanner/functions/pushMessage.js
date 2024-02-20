function pushMessage(pushmsg,msg) {
            pusher.send( pushmsg, function(err, response) {
                if (err) { node.error(err,msg); }
                else {
                    try {
                        var responseObject = JSON.parse(response);
                        if (responseObject.status !== 1) { node.error("[57-pushover.js] Error: "+response); }
                    }
                    catch(e) {
                        node.error("[57-pushover.js] Error: "+response);
                    }
                }
            });
        }