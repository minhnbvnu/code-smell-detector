function deduplicateSorted(array, comparer) {
            if (array.length === 0)
                return emptyArray;
            let last2 = array[0];
            const deduplicated = [last2];
            for (let i = 1; i < array.length; i++) {
                const next = array[i];
                switch (comparer(next, last2)) {
                    case true:
                    case 0 /* EqualTo */:
                        continue;
                    case -1 /* LessThan */:
                        return Debug.fail("Array is unsorted.");
                }
                deduplicated.push(last2 = next);
            }
            return deduplicated;
        }