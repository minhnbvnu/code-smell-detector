function getConstructSignatureDefinition() {
                if (symbol.flags & 32 /* Class */ && !(symbol.flags & (16 /* Function */ | 3 /* Variable */)) && (isNewExpressionTarget(node) || node.kind === 135 /* ConstructorKeyword */)) {
                    const cls = find(filteredDeclarations, isClassLike) || Debug.fail("Expected declaration to have at least one class-like declaration");
                    return getSignatureDefinition(cls.members, 
                    /*selectConstructors*/
                    true);
                }
            }