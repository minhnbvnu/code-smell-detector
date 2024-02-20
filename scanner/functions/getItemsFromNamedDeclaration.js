function getItemsFromNamedDeclaration(patternMatcher, name, declarations, checker, fileName, rawItems) {
            const match = patternMatcher.getMatchForLastSegmentOfPattern(name);
            if (!match) {
                return;
            }
            for (const declaration of declarations) {
                if (!shouldKeepItem(declaration, checker))
                    continue;
                if (patternMatcher.patternContainsDots) {
                    const fullMatch = patternMatcher.getFullMatch(getContainers(declaration), name);
                    if (fullMatch) {
                        rawItems.push({ name, fileName, matchKind: fullMatch.kind, isCaseSensitive: fullMatch.isCaseSensitive, declaration });
                    }
                }
                else {
                    rawItems.push({ name, fileName, matchKind: match.kind, isCaseSensitive: match.isCaseSensitive, declaration });
                }
            }
        }