function is_similar(a, b, tolerance) {
        const comparator = new SimilarComparator(tolerance);
        return comparator.eq(a, b);
    }