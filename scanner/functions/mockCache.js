function mockCache() {
    events.EventEmitter.call(this);
    var theCache = {};
    this.put = function (key, data, duration, cb) {
        cb = cb || function (err, result) {
        };

        if (!key) {
            cb({message:'No key specified'})
        }

        theCache[key] = data;

        cb(null, {message:'success', data:true});
    }


    this.get = function (key, cb) {
        cb = cb || function (err, result) {
        };

        var result = theCache[key];

        if (result === undefined) {
            return cb({message:'failure', data:false});
        }

        cb(null, {message:'success', data:result});
    }
}