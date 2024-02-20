function getNamedSpecifierRanges(namedSpecifierGroup, allNamedSpecifiers) {
                const first = namedSpecifierGroup[0];
                const last = namedSpecifierGroup[namedSpecifierGroup.length - 1];
                const removeRange = [first.range[0], last.range[1]];
                const textRange = [...removeRange];
                const before = sourceCode.getTokenBefore(first);
                textRange[0] = before.range[1];
                if (util.isCommaToken(before)) {
                    removeRange[0] = before.range[0];
                }
                else {
                    removeRange[0] = before.range[1];
                }
                const isFirst = allNamedSpecifiers[0] === first;
                const isLast = allNamedSpecifiers[allNamedSpecifiers.length - 1] === last;
                const after = sourceCode.getTokenAfter(last);
                textRange[1] = after.range[0];
                if (isFirst || isLast) {
                    if (util.isCommaToken(after)) {
                        removeRange[1] = after.range[1];
                    }
                }
                return {
                    textRange,
                    removeRange,
                };
            }