function getConstituentCountOfTypes(types) {
                return reduceLeft(types, (n, t) => n + getConstituentCount(t), 0);
            }