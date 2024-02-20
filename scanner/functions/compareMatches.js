function compareMatches(a, b) {
            return a === void 0 ? 1 /* GreaterThan */ : b === void 0 ? -1 /* LessThan */ : compareValues(a.kind, b.kind) || compareBooleans(!a.isCaseSensitive, !b.isCaseSensitive);
        }