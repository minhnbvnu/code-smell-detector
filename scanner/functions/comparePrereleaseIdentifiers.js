function comparePrereleaseIdentifiers(left, right) {
            if (left === right)
                return 0 /* EqualTo */;
            if (left.length === 0)
                return right.length === 0 ? 0 /* EqualTo */ : 1 /* GreaterThan */;
            if (right.length === 0)
                return -1 /* LessThan */;
            const length2 = Math.min(left.length, right.length);
            for (let i = 0; i < length2; i++) {
                const leftIdentifier = left[i];
                const rightIdentifier = right[i];
                if (leftIdentifier === rightIdentifier)
                    continue;
                const leftIsNumeric = numericIdentifierRegExp.test(leftIdentifier);
                const rightIsNumeric = numericIdentifierRegExp.test(rightIdentifier);
                if (leftIsNumeric || rightIsNumeric) {
                    if (leftIsNumeric !== rightIsNumeric)
                        return leftIsNumeric ? -1 /* LessThan */ : 1 /* GreaterThan */;
                    const result = compareValues(+leftIdentifier, +rightIdentifier);
                    if (result)
                        return result;
                }
                else {
                    const result = compareStringsCaseSensitive(leftIdentifier, rightIdentifier);
                    if (result)
                        return result;
                }
            }
            return compareValues(left.length, right.length);
        }