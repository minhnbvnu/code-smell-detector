function visitAndTransformType(type2, transform2) {
                        var _a3, _b2;
                        const typeId = type2.id;
                        const isConstructorObject = getObjectFlags(type2) & 16 /* Anonymous */ && type2.symbol && type2.symbol.flags & 32 /* Class */;
                        const id = getObjectFlags(type2) & 4 /* Reference */ && type2.node ? "N" + getNodeId(type2.node) : type2.flags & 16777216 /* Conditional */ ? "N" + getNodeId(type2.root.node) : type2.symbol ? (isConstructorObject ? "+" : "") + getSymbolId(type2.symbol) : void 0;
                        if (!context.visitedTypes) {
                            context.visitedTypes = /* @__PURE__ */ new Set();
                        }
                        if (id && !context.symbolDepth) {
                            context.symbolDepth = /* @__PURE__ */ new Map();
                        }
                        const links = context.enclosingDeclaration && getNodeLinks(context.enclosingDeclaration);
                        const key = `${getTypeId(type2)}|${context.flags}`;
                        if (links) {
                            links.serializedTypes || (links.serializedTypes = /* @__PURE__ */ new Map());
                        }
                        const cachedResult = (_a3 = links == null ? void 0 : links.serializedTypes) == null ? void 0 : _a3.get(key);
                        if (cachedResult) {
                            if (cachedResult.truncating) {
                                context.truncating = true;
                            }
                            context.approximateLength += cachedResult.addedLength;
                            return deepCloneOrReuseNode(cachedResult.node);
                        }
                        let depth;
                        if (id) {
                            depth = context.symbolDepth.get(id) || 0;
                            if (depth > 10) {
                                return createElidedInformationPlaceholder(context);
                            }
                            context.symbolDepth.set(id, depth + 1);
                        }
                        context.visitedTypes.add(typeId);
                        const startLength = context.approximateLength;
                        const result = transform2(type2);
                        const addedLength = context.approximateLength - startLength;
                        if (!context.reportedDiagnostic && !context.encounteredError) {
                            (_b2 = links == null ? void 0 : links.serializedTypes) == null ? void 0 : _b2.set(key, { node: result, truncating: context.truncating, addedLength });
                        }
                        context.visitedTypes.delete(typeId);
                        if (id) {
                            context.symbolDepth.set(id, depth);
                        }
                        return result;
                        function deepCloneOrReuseNode(node) {
                            if (!nodeIsSynthesized(node) && getParseTreeNode(node) === node) {
                                return node;
                            }
                            return setTextRange(factory.cloneNode(visitEachChild(node, deepCloneOrReuseNode, nullTransformationContext, deepCloneOrReuseNodes)), node);
                        }
                        function deepCloneOrReuseNodes(nodes, visitor, test, start, count) {
                            if (nodes && nodes.length === 0) {
                                return setTextRange(factory.createNodeArray(
                                /*nodes*/
                                void 0, nodes.hasTrailingComma), nodes);
                            }
                            return visitNodes2(nodes, visitor, test, start, count);
                        }
                    }