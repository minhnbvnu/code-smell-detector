function Needle(method, uri, data, options, callback) {
        // if (!(this instanceof Needle)) {
        //   return new Needle(method, uri, data, options, callback);
        // }
        if (typeof uri !== 'string')
            throw new TypeError('URL must be a string, not ' + uri);
        this.method = method.toLowerCase();
        this.uri = uri;
        this.data = data;
        if (typeof options == 'function') {
            this.callback = options;
            this.options = {};
        }
        else {
            this.callback = callback;
            this.options = options;
        }
    }