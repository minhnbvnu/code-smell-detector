function responseBuilder(fn, opts) {
    opts = _.defaults(opts || {}, {
        valid: true
    });

    return function(req, res, next) {
        var resp = new Twilio.TwimlResponse();
        var rurl = url.resolve(config.host, req.originalUrl);

        console.log("Request from twilio on ", req.path, req.body);

        // Use profile to change 'say' method
        var say = resp.say.bind(resp);
        resp.say = function(msg, attrs) {
            attrs = attrs || {};
            attrs.voice = profile.voice;
            attrs.language = profile.language;

            return say(msg, attrs);
        };

        resp._ = function(msg, ctx) {
            var args = _.toArray(arguments);
            ctx = _.defaults(ctx || {}, {
                config: config
            });
            return _.template(profile.messages[msg] || msg)(ctx);
        };

        Q()
        .then(function() {
            if (!opts.valid) return;

            if (false && !Twilio.validateExpressRequest(req, config.twilio.token, { url: rurl })) {
                var e = new Error("Twilio Request Validation Failed.")
                e.status = 403;
                throw e;
            }
        })
        .then(function() {
            var args = _.extend({}, req.query, req.body);

            return fn(resp, args, req, res);
        })
        .then(function() {
            res.set('Content-Type', 'text/xml');
            res.status(200).send(resp.toString());
        })
        .fail(next);
    };
}