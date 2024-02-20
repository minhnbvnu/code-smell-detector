function deduplicateEquality(array, equalityComparer) {
            const result = [];
            for (const item of array) {
                pushIfUnique(result, item, equalityComparer);
            }
            return result;
        }