function stableSortIndices(array, indices, comparer) {
            indices.sort((x, y) => comparer(array[x], array[y]) || compareValues(x, y));
        }