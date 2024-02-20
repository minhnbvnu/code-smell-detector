function compareProperties(a, b, key, comparer) {
            return a === b ? 0 /* EqualTo */ : a === void 0 ? -1 /* LessThan */ : b === void 0 ? 1 /* GreaterThan */ : comparer(a[key], b[key]);
        }