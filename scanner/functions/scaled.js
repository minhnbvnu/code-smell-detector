function scaled(n, size) {
        if (n instanceof dimension_1.default && n.unit.is('%')) {
            return parseFloat(n.value * size / 100);
        }
        else {
            return number(n);
        }
    }