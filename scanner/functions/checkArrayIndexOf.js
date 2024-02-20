function checkArrayIndexOf(node, allowFixing) {
                var _a, _b, _c;
                // Check if the comparison is equivalent to `includes()`.
                const callNode = node.parent;
                const compareNode = (((_a = callNode.parent) === null || _a === void 0 ? void 0 : _a.type) === utils_1.AST_NODE_TYPES.ChainExpression
                    ? callNode.parent.parent
                    : callNode.parent);
                const negative = isNegativeCheck(compareNode);
                if (!negative && !isPositiveCheck(compareNode)) {
                    return;
                }
                // Get the symbol of `indexOf` method.
                const tsNode = services.esTreeNodeToTSNodeMap.get(node.property);
                const indexofMethodDeclarations = (_b = types
                    .getSymbolAtLocation(tsNode)) === null || _b === void 0 ? void 0 : _b.getDeclarations();
                if (indexofMethodDeclarations == null ||
                    indexofMethodDeclarations.length === 0) {
                    return;
                }
                // Check if every declaration of `indexOf` method has `includes` method
                // and the two methods have the same parameters.
                for (const instanceofMethodDecl of indexofMethodDeclarations) {
                    const typeDecl = instanceofMethodDecl.parent;
                    const type = types.getTypeAtLocation(typeDecl);
                    const includesMethodDecl = (_c = type
                        .getProperty('includes')) === null || _c === void 0 ? void 0 : _c.getDeclarations();
                    if (includesMethodDecl == null ||
                        !includesMethodDecl.some(includesMethodDecl => hasSameParameters(includesMethodDecl, instanceofMethodDecl))) {
                        return;
                    }
                }
                // Report it.
                context.report(Object.assign({ node: compareNode, messageId: 'preferIncludes' }, (allowFixing && {
                    *fix(fixer) {
                        if (negative) {
                            yield fixer.insertTextBefore(callNode, '!');
                        }
                        yield fixer.replaceText(node.property, 'includes');
                        yield fixer.removeRange([callNode.range[1], compareNode.range[1]]);
                    },
                })));
            }