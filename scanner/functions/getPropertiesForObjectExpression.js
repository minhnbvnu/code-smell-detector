function getPropertiesForObjectExpression(contextualType, completionsType, obj, checker) {
            const hasCompletionsType = completionsType && completionsType !== contextualType;
            const type = hasCompletionsType && !(completionsType.flags & 3 /* AnyOrUnknown */) ? checker.getUnionType([contextualType, completionsType]) : contextualType;
            const properties = getApparentProperties(type, obj, checker);
            return type.isClass() && containsNonPublicProperties(properties) ? [] : hasCompletionsType ? filter(properties, hasDeclarationOtherThanSelf) : properties;
            function hasDeclarationOtherThanSelf(member) {
                if (!length(member.declarations))
                    return true;
                return some(member.declarations, (decl) => decl.parent !== obj);
            }
        }