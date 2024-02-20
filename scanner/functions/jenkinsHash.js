function jenkinsHash(key) {
            let hash; let
                i;
            for (hash = i = 0; i < key.length; ++i) {
                hash += key.charCodeAt(i);
                hash += (hash << 10);
                hash ^= (hash >> 6);
            }
            hash += (hash << 3);
            hash ^= (hash >> 11);
            hash += (hash << 15);
            return hash;
        }