function mergePossibles(tuples, tl) {
        if (tl) {
            var j = -1, hashCode;
            while (++j < tl) {
                hashCode = tuples[j].hashCode;
                if (!POSSIBLES_HASH[hashCode]) {
                    POSSIBLES_HASH[hashCode] = true;
                    PL++;
                }
            }
        }
    }