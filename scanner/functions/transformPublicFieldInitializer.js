function transformPublicFieldInitializer(node) {
                if (shouldTransformInitializers && !isAutoAccessorPropertyDeclaration(node)) {
                    const expr = getPropertyNameExpressionIfNeeded(node.name, 
                    /*shouldHoist*/
                    !!node.initializer || useDefineForClassFields, 
                    /*captureReferencedName*/
                    isNamedEvaluation(node, isAnonymousClassNeedingAssignedName));
                    if (expr) {
                        getPendingExpressions().push(...flattenCommaList(expr));
                    }
                    if (isStatic(node) && !shouldTransformPrivateElementsOrClassStaticBlocks) {
                        const initializerStatement = transformPropertyOrClassStaticBlock(node, factory2.createThis());
                        if (initializerStatement) {
                            const staticBlock = factory2.createClassStaticBlockDeclaration(factory2.createBlock([initializerStatement]));
                            setOriginalNode(staticBlock, node);
                            setCommentRange(staticBlock, node);
                            setCommentRange(initializerStatement, { pos: -1, end: -1 });
                            setSyntheticLeadingComments(initializerStatement, void 0);
                            setSyntheticTrailingComments(initializerStatement, void 0);
                            return staticBlock;
                        }
                    }
                    return void 0;
                }
                return factory2.updatePropertyDeclaration(node, visitNodes2(node.modifiers, modifierVisitor, isModifier), visitNode(node.name, propertyNameVisitor, isPropertyName), 
                /*questionOrExclamationToken*/
                void 0, 
                /*type*/
                void 0, visitNode(node.initializer, visitor, isExpression));
            }