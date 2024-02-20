function MurmurHash3(key, seed) {
            var m = this instanceof MurmurHash3 ? this : cache;
            m.reset(seed);
            if (typeof key === 'string' && key.length > 0) {
                m.hash(key);
            }
            if (m !== this) {
                return m;
            }
        }