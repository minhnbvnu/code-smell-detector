function is_structurally_equal(a, b) {
        const comparator = new Comparator({ structural: true });
        return comparator.eq(a, b);
    }