function constraintsAreEqual(a, b) {
                return (a === b || (a !== undefined && b !== undefined && a.type === b.type));
            }