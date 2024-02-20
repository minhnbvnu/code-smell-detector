function typeParametersAreEqual(a, b) {
                return (a.name.name === b.name.name &&
                    constraintsAreEqual(a.constraint, b.constraint));
            }