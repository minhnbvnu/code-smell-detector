function sortAndDeduplicate(array, comparer, equalityComparer) {
            return deduplicateSorted(sort(array, comparer), equalityComparer || comparer || compareStringsCaseSensitive);
        }