function getSuggestedTypeForNonexistentStringLiteralType(source, target) {
                const candidates = target.types.filter((type) => !!(type.flags & 128 /* StringLiteral */));
                return getSpellingSuggestion(source.value, candidates, (type) => type.value);
            }