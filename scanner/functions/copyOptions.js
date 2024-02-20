function copyOptions(obj1, obj2) {
        if (obj2 && obj2._defaults) {
            return obj2;
        }
        var opts = defaults(obj1, obj2);
        if (opts.strictMath) {
            opts.math = Constants.Math.PARENS;
        }
        // Back compat with changed relativeUrls option
        if (opts.relativeUrls) {
            opts.rewriteUrls = Constants.RewriteUrls.ALL;
        }
        if (typeof opts.math === 'string') {
            switch (opts.math.toLowerCase()) {
                case 'always':
                    opts.math = Constants.Math.ALWAYS;
                    break;
                case 'parens-division':
                    opts.math = Constants.Math.PARENS_DIVISION;
                    break;
                case 'strict':
                case 'parens':
                    opts.math = Constants.Math.PARENS;
                    break;
                default:
                    opts.math = Constants.Math.PARENS;
            }
        }
        if (typeof opts.rewriteUrls === 'string') {
            switch (opts.rewriteUrls.toLowerCase()) {
                case 'off':
                    opts.rewriteUrls = Constants.RewriteUrls.OFF;
                    break;
                case 'local':
                    opts.rewriteUrls = Constants.RewriteUrls.LOCAL;
                    break;
                case 'all':
                    opts.rewriteUrls = Constants.RewriteUrls.ALL;
                    break;
            }
        }
        return opts;
    }