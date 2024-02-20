function isNonLocalAlias(symbol, excludes = 111551 /* Value */ | 788968 /* Type */ | 1920 /* Namespace */) {
                if (!symbol)
                    return false;
                return (symbol.flags & (2097152 /* Alias */ | excludes)) === 2097152 /* Alias */ || !!(symbol.flags & 2097152 /* Alias */ && symbol.flags & 67108864 /* Assignment */);
            }