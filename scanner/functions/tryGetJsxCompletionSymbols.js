function tryGetJsxCompletionSymbols() {
                const jsxContainer = tryGetContainingJsxElement(contextToken);
                const attrsType = jsxContainer && typeChecker.getContextualType(jsxContainer.attributes);
                if (!attrsType)
                    return 0 /* Continue */;
                const completionsType = jsxContainer && typeChecker.getContextualType(jsxContainer.attributes, 4 /* Completions */);
                symbols = concatenate(symbols, filterJsxAttributes(getPropertiesForObjectExpression(attrsType, completionsType, jsxContainer.attributes, typeChecker), jsxContainer.attributes.properties));
                setSortTextToOptionalMember();
                completionKind = 3 /* MemberLike */;
                isNewIdentifierLocation = false;
                return 1 /* Success */;
            }