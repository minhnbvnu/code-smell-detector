function getHighlightSpans(node, sourceFile) {
                        switch (node.kind) {
                            case 99 /* IfKeyword */:
                            case 91 /* ElseKeyword */:
                                return isIfStatement(node.parent) ? getIfElseOccurrences(node.parent, sourceFile) : void 0;
                            case 105 /* ReturnKeyword */:
                                return useParent(node.parent, isReturnStatement, getReturnOccurrences);
                            case 109 /* ThrowKeyword */:
                                return useParent(node.parent, isThrowStatement, getThrowOccurrences);
                            case 111 /* TryKeyword */:
                            case 83 /* CatchKeyword */:
                            case 96 /* FinallyKeyword */:
                                const tryStatement = node.kind === 83 /* CatchKeyword */ ? node.parent.parent : node.parent;
                                return useParent(tryStatement, isTryStatement, getTryCatchFinallyOccurrences);
                            case 107 /* SwitchKeyword */:
                                return useParent(node.parent, isSwitchStatement, getSwitchCaseDefaultOccurrences);
                            case 82 /* CaseKeyword */:
                            case 88 /* DefaultKeyword */: {
                                if (isDefaultClause(node.parent) || isCaseClause(node.parent)) {
                                    return useParent(node.parent.parent.parent, isSwitchStatement, getSwitchCaseDefaultOccurrences);
                                }
                                return void 0;
                            }
                            case 81 /* BreakKeyword */:
                            case 86 /* ContinueKeyword */:
                                return useParent(node.parent, isBreakOrContinueStatement, getBreakOrContinueStatementOccurrences);
                            case 97 /* ForKeyword */:
                            case 115 /* WhileKeyword */:
                            case 90 /* DoKeyword */:
                                return useParent(node.parent, (n) => isIterationStatement(n, 
                                /*lookInLabeledStatements*/
                                true), getLoopBreakContinueOccurrences);
                            case 135 /* ConstructorKeyword */:
                                return getFromAllDeclarations(isConstructorDeclaration, [135 /* ConstructorKeyword */]);
                            case 137 /* GetKeyword */:
                            case 151 /* SetKeyword */:
                                return getFromAllDeclarations(isAccessor, [137 /* GetKeyword */, 151 /* SetKeyword */]);
                            case 133 /* AwaitKeyword */:
                                return useParent(node.parent, isAwaitExpression, getAsyncAndAwaitOccurrences);
                            case 132 /* AsyncKeyword */:
                                return highlightSpans(getAsyncAndAwaitOccurrences(node));
                            case 125 /* YieldKeyword */:
                                return highlightSpans(getYieldOccurrences(node));
                            case 101 /* InKeyword */:
                                return void 0;
                            default:
                                return isModifierKind(node.kind) && (isDeclaration(node.parent) || isVariableStatement(node.parent)) ? highlightSpans(getModifierOccurrences(node.kind, node.parent)) : void 0;
                        }
                        function getFromAllDeclarations(nodeTest, keywords) {
                            return useParent(node.parent, nodeTest, (decl) => {
                                var _a2;
                                return mapDefined((_a2 = tryCast(decl, canHaveSymbol)) == null ? void 0 : _a2.symbol.declarations, (d) => nodeTest(d) ? find(d.getChildren(sourceFile), (c) => contains(keywords, c.kind)) : void 0);
                            });
                        }
                        function useParent(node2, nodeTest, getNodes4) {
                            return nodeTest(node2) ? highlightSpans(getNodes4(node2, sourceFile)) : void 0;
                        }
                        function highlightSpans(nodes) {
                            return nodes && nodes.map((node2) => getHighlightSpanForNode(node2, sourceFile));
                        }
                    }