function arraysAreEqual(a, b, eq) {
        return (a === b ||
            (a !== undefined &&
                b !== undefined &&
                a.length === b.length &&
                a.every((x, idx) => eq(x, b[idx]))));
    }