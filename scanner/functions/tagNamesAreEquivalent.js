function tagNamesAreEquivalent(lhs, rhs) {
            if (lhs.kind !== rhs.kind) {
                return false;
            }
            if (lhs.kind === 79 /* Identifier */) {
                return lhs.escapedText === rhs.escapedText;
            }
            if (lhs.kind === 108 /* ThisKeyword */) {
                return true;
            }
            return lhs.name.escapedText === rhs.name.escapedText && tagNamesAreEquivalent(lhs.expression, rhs.expression);
        }