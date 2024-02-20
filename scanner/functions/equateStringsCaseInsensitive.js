function equateStringsCaseInsensitive(a, b) {
            return a === b || a !== void 0 && b !== void 0 && a.toUpperCase() === b.toUpperCase();
        }