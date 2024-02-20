function deduplicateRelational(array, equalityComparer, comparer) {
            const indices = indicesOf(array);
            stableSortIndices(array, indices, comparer);
            let last2 = array[indices[0]];
            const deduplicated = [indices[0]];
            for (let i = 1; i < indices.length; i++) {
                const index = indices[i];
                const item = array[index];
                if (!equalityComparer(last2, item)) {
                    deduplicated.push(index);
                    last2 = item;
                }
            }
            deduplicated.sort();
            return deduplicated.map((i) => array[i]);
        }