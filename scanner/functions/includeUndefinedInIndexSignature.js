function includeUndefinedInIndexSignature(type) {
                if (!type)
                    return type;
                return compilerOptions.noUncheckedIndexedAccess ? getUnionType([type, missingType]) : type;
            }