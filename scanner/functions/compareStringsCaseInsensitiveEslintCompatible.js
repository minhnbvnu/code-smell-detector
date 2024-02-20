function compareStringsCaseInsensitiveEslintCompatible(a, b) {
            if (a === b)
                return 0 /* EqualTo */;
            if (a === void 0)
                return -1 /* LessThan */;
            if (b === void 0)
                return 1 /* GreaterThan */;
            a = a.toLowerCase();
            b = b.toLowerCase();
            return a < b ? -1 /* LessThan */ : a > b ? 1 /* GreaterThan */ : 0 /* EqualTo */;
        }