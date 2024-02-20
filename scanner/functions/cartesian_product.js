function cartesian_product(...arrays) {
        return arrays.reduce((acc, curr) => [...acc].flatMap((c) => curr.map((n) => [].concat(c, n))));
    }