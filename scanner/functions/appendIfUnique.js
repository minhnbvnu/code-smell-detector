function appendIfUnique(array, toAdd, equalityComparer) {
            if (array) {
                pushIfUnique(array, toAdd, equalityComparer);
                return array;
            }
            else {
                return [toAdd];
            }
        }