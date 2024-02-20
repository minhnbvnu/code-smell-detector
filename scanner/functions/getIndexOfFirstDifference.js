function getIndexOfFirstDifference(a, b, equal) {
                for (let i = 0; i < a.length && i < b.length; i++) {
                    if (!equal(a[i], b[i])) {
                        return i;
                    }
                }
                return undefined;
            }