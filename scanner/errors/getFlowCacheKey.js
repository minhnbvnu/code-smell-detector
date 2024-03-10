function getFlowCacheKey(node, declaredType, initialType, flowContainer) {
                switch (node.kind) {
                    case 79 /* Identifier */:
                        if (!isThisInTypeQuery(node)) {
                            const symbol = getResolvedSymbol(node);
                            return symbol !== unknownSymbol ? `${flowContainer ? getNodeId(flowContainer) : "-1"}|${getTypeId(declaredType)}|${getTypeId(initialType)}|${getSymbolId(symbol)}` : void 0;
                        }
                    case 108 /* ThisKeyword */:
                        return `0|${flowContainer ? getNodeId(flowContainer) : "-1"}|${getTypeId(declaredType)}|${getTypeId(initialType)}`;
                    case 232 /* NonNullExpression */:
                    case 214 /* ParenthesizedExpression */:
                        return getFlowCacheKey(node.expression, declaredType, initialType, flowContainer);
                    case 163 /* QualifiedName */:
                        const left = getFlowCacheKey(node.left, declaredType, initialType, flowContainer);
                        return left && left + "." + node.right.escapedText;
                    case 208 /* PropertyAccessExpression */:
                    case 209 /* ElementAccessExpression */:
                        const propName = getAccessedPropertyName(node);
                        if (propName !== void 0) {
                            const key = getFlowCacheKey(node.expression, declaredType, initialType, flowContainer);
                            return key && key + "." + propName;
                        }
                        break;
                    case 203 /* ObjectBindingPattern */:
                    case 204 /* ArrayBindingPattern */:
                    case 259 /* FunctionDeclaration */:
                    case 215 /* FunctionExpression */:
                    case 216 /* ArrowFunction */:
                    case 171 /* MethodDeclaration */:
                        return `${getNodeId(node)}#${getTypeId(declaredType)}`;
                }
                return void 0;
            }