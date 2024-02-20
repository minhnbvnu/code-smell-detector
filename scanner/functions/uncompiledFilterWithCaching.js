function uncompiledFilterWithCaching(items, args, cache) {
            var retval = [], idx = 0, item;
            for (var i = 0, ii = items.length; i < ii; i++) {
                item = items[i];
                if (cache[i]) {
                    retval[idx++] = item;
                }
                else if (filter(item, args)) {
                    retval[idx++] = item;
                    cache[i] = true;
                }
            }
            return retval;
        }