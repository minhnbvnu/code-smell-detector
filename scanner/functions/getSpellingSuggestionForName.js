function getSpellingSuggestionForName(name, symbols, meaning) {
                return getSpellingSuggestion(name, symbols, getCandidateName);
                function getCandidateName(candidate) {
                    const candidateName = symbolName(candidate);
                    if (startsWith(candidateName, '"')) {
                        return void 0;
                    }
                    if (candidate.flags & meaning) {
                        return candidateName;
                    }
                    if (candidate.flags & 2097152 /* Alias */) {
                        const alias = tryResolveAlias(candidate);
                        if (alias && alias.flags & meaning) {
                            return candidateName;
                        }
                    }
                    return void 0;
                }
            }