function firstIterator(iter) {
            for (const value of iter) {
                return value;
            }
            Debug.fail("iterator is empty");
        }