function GetTemplate(parser, cmd, cs) {
            var c = parser.GetNext();
            var params = [];
            var n = 0;
            var i = parser.i;
            while (parser.i < parser.string.length) {
                c = parser.GetNext();
                if (c === '#') {
                    if (i !== parser.i) {
                        params[n] = parser.string.substr(i, parser.i - i);
                    }
                    c = parser.string.charAt(++parser.i);
                    if (!c.match(/^[1-9]$/)) {
                        throw new TexError_js_1.default('CantUseHash2', 'Illegal use of # in template for %1', cs);
                    }
                    if (parseInt(c) !== ++n) {
                        throw new TexError_js_1.default('SequentialParam', 'Parameters for %1 must be numbered sequentially', cs);
                    }
                    i = parser.i + 1;
                }
                else if (c === '{') {
                    if (i !== parser.i) {
                        params[n] = parser.string.substr(i, parser.i - i);
                    }
                    if (params.length > 0) {
                        return [n.toString()].concat(params);
                    }
                    else {
                        return n;
                    }
                }
                parser.i++;
            }
            throw new TexError_js_1.default('MissingReplacementString', 'Missing replacement string for definition of %1', cmd);
        }