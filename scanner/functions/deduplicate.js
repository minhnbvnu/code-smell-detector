function deduplicate(array, equalityComparer, comparer) {
            return array.length === 0 ? [] : array.length === 1 ? array.slice() : comparer ? deduplicateRelational(array, equalityComparer, comparer) : deduplicateEquality(array, equalityComparer);
        }