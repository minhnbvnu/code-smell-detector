function transformPrivateFieldInitializer(node) {
                if (shouldTransformClassElementToWeakMap(node)) {
                    const info = accessPrivateIdentifier2(node.name);
                    Debug.assert(info, "Undeclared private name for property declaration.");
                    if (!info.isValid) {
                        return node;
                    }
                    if (info.isStatic && !shouldTransformPrivateElementsOrClassStaticBlocks) {
                        const statement = transformPropertyOrClassStaticBlock(node, factory2.createThis());
                        if (statement) {
                            return factory2.createClassStaticBlockDeclaration(factory2.createBlock([statement], 
                            /*multiLine*/
                            true));
                        }
                    }
                    return void 0;
                }
                if (shouldTransformInitializersUsingSet && !isStatic(node) && (lexicalEnvironment == null ? void 0 : lexicalEnvironment.data) && lexicalEnvironment.data.facts & 16 /* WillHoistInitializersToConstructor */) {
                    return factory2.updatePropertyDeclaration(node, visitNodes2(node.modifiers, visitor, isModifierLike), node.name, 
                    /*questionOrExclamationToken*/
                    void 0, 
                    /*type*/
                    void 0, 
                    /*initializer*/
                    void 0);
                }
                if (isNamedEvaluation(node, isAnonymousClassNeedingAssignedName)) {
                    const { referencedName, name } = visitReferencedPropertyName(node.name);
                    return factory2.updatePropertyDeclaration(node, visitNodes2(node.modifiers, modifierVisitor, isModifier), name, 
                    /*questionOrExclamationToken*/
                    void 0, 
                    /*type*/
                    void 0, visitNode(node.initializer, (child) => namedEvaluationVisitor(child, referencedName), isExpression));
                }
                return factory2.updatePropertyDeclaration(node, visitNodes2(node.modifiers, modifierVisitor, isModifier), visitNode(node.name, propertyNameVisitor, isPropertyName), 
                /*questionOrExclamationToken*/
                void 0, 
                /*type*/
                void 0, visitNode(node.initializer, visitor, isExpression));
            }