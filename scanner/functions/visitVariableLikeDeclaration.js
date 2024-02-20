function visitVariableLikeDeclaration(decl) {
                if (!decl.initializer || isBindingPattern(decl.name) || isVariableDeclaration(decl) && !isHintableDeclaration(decl)) {
                    return;
                }
                const effectiveTypeAnnotation = getEffectiveTypeAnnotationNode(decl);
                if (effectiveTypeAnnotation) {
                    return;
                }
                const declarationType = checker.getTypeAtLocation(decl);
                if (isModuleReferenceType(declarationType)) {
                    return;
                }
                const typeDisplayString = printTypeInSingleLine(declarationType);
                if (typeDisplayString) {
                    const isVariableNameMatchesType = preferences.includeInlayVariableTypeHintsWhenTypeMatchesName === false && equateStringsCaseInsensitive(decl.name.getText(), typeDisplayString);
                    if (isVariableNameMatchesType) {
                        return;
                    }
                    addTypeHints(typeDisplayString, decl.name.end);
                }
            }