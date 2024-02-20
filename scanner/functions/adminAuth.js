function adminAuth(req, res, next) {
    var user = basicAuth(req);
    user = team.auth(user);

    if (user) {
        res.locals.capability = {
            token: twilio.capability(user)
        };

        return next();
    } else {
        res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
        return res.send(401);
    };
}