function tryAddToSet(set, value) {
            if (!set.has(value)) {
                set.add(value);
                return true;
            }
            return false;
        }