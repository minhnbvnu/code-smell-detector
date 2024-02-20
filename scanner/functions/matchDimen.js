function matchDimen(dim, rest) {
            if (rest === void 0) {
                rest = false;
            }
            var match = dim.match(rest ? dimenRest : dimenEnd);
            return match ?
                muReplace([match[1].replace(/,/, '.'), match[4], match[0].length]) :
                [null, null, 0];
        }