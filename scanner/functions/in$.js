function in$(x, xs) {
            var i = -1, l = xs.length >>> 0;
            while (++i < l)
                if (x === xs[i])
                    return true;
            return false;
        }