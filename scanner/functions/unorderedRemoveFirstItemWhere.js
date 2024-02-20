function unorderedRemoveFirstItemWhere(array, predicate) {
            for (let i = 0; i < array.length; i++) {
                if (predicate(array[i])) {
                    unorderedRemoveItemAt(array, i);
                    return true;
                }
            }
            return false;
        }