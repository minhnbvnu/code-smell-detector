function Converter(sm, opts) {
        opts = opts || {};
        if (opts.hasComment) {
            sm = stripComment(sm);
        }
        if (opts.encoding === 'base64') {
            sm = decodeBase64(sm);
        }
        else if (opts.encoding === 'uri') {
            sm = decodeURIComponent(sm);
        }
        if (opts.isJSON || opts.encoding) {
            sm = JSON.parse(sm);
        }
        this.sourcemap = sm;
    }