function mergeNotPossibles(tuples, tl) {
        if (tl) {
            var j = -1, hashCode;
            while (++j < tl) {
                hashCode = tuples[j].hashCode;
                if (!NOT_POSSIBLES_HASH[hashCode]) {
                    NOT_POSSIBLES_HASH[hashCode] = true;
                    NPL++;
                }
            }
        }
    }