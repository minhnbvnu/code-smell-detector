function visitParameterDeclaration(node) {
                let updated;
                if (isNamedEvaluation(node, isAnonymousClassNeedingAssignedName)) {
                    const assignedName = getAssignedNameOfIdentifier(node.name, node.initializer);
                    const name = visitNode(node.name, visitor, isBindingName);
                    const initializer = visitNode(node.initializer, (node2) => namedEvaluationVisitor(node2, assignedName), isExpression);
                    updated = factory2.updateParameterDeclaration(node, 
                    /*modifiers*/
                    void 0, 
                    /*dotDotDotToken*/
                    void 0, name, 
                    /*questionToken*/
                    void 0, 
                    /*type*/
                    void 0, initializer);
                }
                else {
                    updated = factory2.updateParameterDeclaration(node, 
                    /*modifiers*/
                    void 0, node.dotDotDotToken, visitNode(node.name, visitor, isBindingName), 
                    /*questionToken*/
                    void 0, 
                    /*type*/
                    void 0, visitNode(node.initializer, visitor, isExpression));
                }
                if (updated !== node) {
                    setCommentRange(updated, node);
                    setTextRange(updated, moveRangePastModifiers(node));
                    setSourceMapRange(updated, moveRangePastModifiers(node));
                    setEmitFlags(updated.name, 64 /* NoTrailingSourceMap */);
                }
                return updated;
            }