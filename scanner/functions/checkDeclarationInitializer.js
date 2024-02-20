function checkDeclarationInitializer(declaration, checkMode, contextualType) {
                const initializer = getEffectiveInitializer(declaration);
                if (isInJSFile(declaration)) {
                    const typeNode = tryGetJSDocSatisfiesTypeNode(declaration);
                    if (typeNode) {
                        return checkSatisfiesExpressionWorker(initializer, typeNode, checkMode);
                    }
                }
                const type = getQuickTypeOfExpression(initializer) || (contextualType ? checkExpressionWithContextualType(initializer, contextualType, 
                /*inferenceContext*/
                void 0, checkMode || 0 /* Normal */) : checkExpressionCached(initializer, checkMode));
                return isParameter(declaration) && declaration.name.kind === 204 /* ArrayBindingPattern */ && isTupleType(type) && !type.target.hasRestElement && getTypeReferenceArity(type) < declaration.name.elements.length ? padTupleType(type, declaration.name) : type;
            }