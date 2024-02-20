function checkComputedPropertyName(node) {
                const links = getNodeLinks(node.expression);
                if (!links.resolvedType) {
                    if ((isTypeLiteralNode(node.parent.parent) || isClassLike(node.parent.parent) || isInterfaceDeclaration(node.parent.parent)) && isBinaryExpression(node.expression) && node.expression.operatorToken.kind === 101 /* InKeyword */ && node.parent.kind !== 174 /* GetAccessor */ && node.parent.kind !== 175 /* SetAccessor */) {
                        return links.resolvedType = errorType;
                    }
                    links.resolvedType = checkExpression(node.expression);
                    if (isPropertyDeclaration(node.parent) && !hasStaticModifier(node.parent) && isClassExpression(node.parent.parent)) {
                        const container = getEnclosingBlockScopeContainer(node.parent.parent);
                        const enclosingIterationStatement = getEnclosingIterationStatement(container);
                        if (enclosingIterationStatement) {
                            getNodeLinks(enclosingIterationStatement).flags |= 4096 /* LoopWithCapturedBlockScopedBinding */;
                            getNodeLinks(node).flags |= 32768 /* BlockScopedBindingInLoop */;
                            getNodeLinks(node.parent.parent).flags |= 32768 /* BlockScopedBindingInLoop */;
                        }
                    }
                    if (links.resolvedType.flags & 98304 /* Nullable */ || !isTypeAssignableToKind(links.resolvedType, 402653316 /* StringLike */ | 296 /* NumberLike */ | 12288 /* ESSymbolLike */) && !isTypeAssignableTo(links.resolvedType, stringNumberSymbolType)) {
                        error(node, Diagnostics.A_computed_property_name_must_be_of_type_string_number_symbol_or_any);
                    }
                }
                return links.resolvedType;
            }