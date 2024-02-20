function compareComparableValues(a, b) {
            return a === b ? 0 /* EqualTo */ : a === void 0 ? -1 /* LessThan */ : b === void 0 ? 1 /* GreaterThan */ : a < b ? -1 /* LessThan */ : 1 /* GreaterThan */;
        }