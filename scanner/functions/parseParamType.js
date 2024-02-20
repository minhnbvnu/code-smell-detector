function parseParamType(src, opt) {
            var expr;
            source = src;
            length = source.length;
            index = 0;
            previous = 0;
            addRange = opt && opt.range;
            rangeOffset = opt && opt.startIndex || 0;
            next();
            expr = parseTopParamType();
            if (opt && opt.midstream) {
                return {
                    expression: expr,
                    index: previous
                };
            }
            if (token !== Token.EOF) {
                utility.throwError('not reach to EOF');
            }
            return expr;
        }