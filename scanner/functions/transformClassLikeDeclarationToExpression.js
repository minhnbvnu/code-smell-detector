function transformClassLikeDeclarationToExpression(node) {
                if (node.name) {
                    enableSubstitutionsForBlockScopedBindings();
                }
                const extendsClauseElement = getClassExtendsHeritageElement(node);
                const classFunction = factory2.createFunctionExpression(
                /*modifiers*/
                void 0, 
                /*asteriskToken*/
                void 0, 
                /*name*/
                void 0, 
                /*typeParameters*/
                void 0, extendsClauseElement ? [factory2.createParameterDeclaration(
                    /*modifiers*/
                    void 0, 
                    /*dotDotDotToken*/
                    void 0, factory2.createUniqueName("_super", 16 /* Optimistic */ | 32 /* FileLevel */))] : [], 
                /*type*/
                void 0, transformClassBody(node, extendsClauseElement));
                setEmitFlags(classFunction, getEmitFlags(node) & 131072 /* Indented */ | 1048576 /* ReuseTempVariableScope */);
                const inner = factory2.createPartiallyEmittedExpression(classFunction);
                setTextRangeEnd(inner, node.end);
                setEmitFlags(inner, 3072 /* NoComments */);
                const outer = factory2.createPartiallyEmittedExpression(inner);
                setTextRangeEnd(outer, skipTrivia(currentText, node.pos));
                setEmitFlags(outer, 3072 /* NoComments */);
                const result = factory2.createParenthesizedExpression(factory2.createCallExpression(outer, 
                /*typeArguments*/
                void 0, extendsClauseElement ? [Debug.checkDefined(visitNode(extendsClauseElement.expression, visitor, isExpression))] : []));
                addSyntheticLeadingComment(result, 3 /* MultiLineCommentTrivia */, "* @class ");
                return result;
            }