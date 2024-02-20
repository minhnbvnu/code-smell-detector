function stableSort(array, comparer) {
            const indices = indicesOf(array);
            stableSortIndices(array, indices, comparer);
            return indices.map((i) => array[i]);
        }