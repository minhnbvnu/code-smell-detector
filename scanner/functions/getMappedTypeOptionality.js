function getMappedTypeOptionality(type) {
                const modifiers = getMappedTypeModifiers(type);
                return modifiers & 8 /* ExcludeOptional */ ? -1 : modifiers & 4 /* IncludeOptional */ ? 1 : 0;
            }