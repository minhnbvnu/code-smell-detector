function _deepMerge(target, source) {
            var name, s, t;
            for (name in source) {
                if (hasOwn.call(source, name)) {
                    s = source[name];
                    t = target[name];
                    if (!deepEqual(t, s)) {
                        if (isHash(t) && isHash(s)) {
                            target[name] = _deepMerge(t, s);
                        } else if (isHash(s)) {
                            target[name] = _deepMerge({}, s);
                        } else {
                            target[name] = s;
                        }
                    }
                }
            }
            return target;
        }