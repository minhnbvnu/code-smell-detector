function reinviteUser(user){

            let invite = new Invitation({"user_id": user.get("id")});
            invite.create(function (err, result) {
                if (!err) {
                    let apiUrl = req.protocol + '://' + req.get('host') + "/api/v1/users/register?token=" + result.get("token");
                    let frontEndUrl = req.protocol + '://' + req.get('host') + "/invitation/" + result.get("token");
                    EventLogs.logEvent(req.user.get('id'), `users ${req.body.email} was reinvited by user ${req.user.get('email')}`);
                    res.locals.json = {token: result.get("token"), url: frontEndUrl, api: apiUrl};
                    user.set('url', frontEndUrl);
                    user.set('api', apiUrl);
                    res.locals.valid_object = result;
                    next();
                    store.dispatchEvent("user_invited", user);
                } else {
                    res.status(403).json({error: err});
                }
            });

        }