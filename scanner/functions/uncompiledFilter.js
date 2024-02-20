function uncompiledFilter(items, args) {
            var retval = [], idx = 0;
            for (var i = 0, ii = items.length; i < ii; i++) {
                if (filter(items[i], args)) {
                    retval[idx++] = items[i];
                }
            }
            return retval;
        }