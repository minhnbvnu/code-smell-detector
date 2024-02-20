function hasEntry(entries, name) {
                const index = binarySearch(entries, name, identity, compareStringsCaseSensitive);
                return index >= 0;
            }