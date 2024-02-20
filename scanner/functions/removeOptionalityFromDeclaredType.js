function removeOptionalityFromDeclaredType(declaredType, declaration) {
                const removeUndefined = strictNullChecks && declaration.kind === 166 /* Parameter */ && declaration.initializer && getTypeFacts(declaredType) & 16777216 /* IsUndefined */ && !parameterInitializerContainsUndefined(declaration);
                return removeUndefined ? getTypeWithFacts(declaredType, 524288 /* NEUndefined */) : declaredType;
            }