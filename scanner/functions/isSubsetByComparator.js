function isSubsetByComparator(comparator, arrA, arrB) {
        return arrA.every(a => arrB.some(b => comparator(a, b)));
    }