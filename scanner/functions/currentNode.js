function currentNode(parsingContext2, pos) {
                        var _a2;
                        if (!syntaxCursor || !isReusableParsingContext(parsingContext2) || parseErrorBeforeNextFinishedNode) {
                            return void 0;
                        }
                        const node = syntaxCursor.currentNode(pos != null ? pos : scanner2.getStartPos());
                        if (nodeIsMissing(node) || node.intersectsChange || containsParseError(node)) {
                            return void 0;
                        }
                        const nodeContextFlags = node.flags & 50720768 /* ContextFlags */;
                        if (nodeContextFlags !== contextFlags) {
                            return void 0;
                        }
                        if (!canReuseNode(node, parsingContext2)) {
                            return void 0;
                        }
                        if (canHaveJSDoc(node) && ((_a2 = node.jsDoc) == null ? void 0 : _a2.jsDocCache)) {
                            node.jsDoc.jsDocCache = void 0;
                        }
                        return node;
                    }