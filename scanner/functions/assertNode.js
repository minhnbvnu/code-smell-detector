function assertNode(node, test, message, stackCrawlMark) {
                        if (shouldAssertFunction(1 /* Normal */, "assertNode")) {
                            assert(node !== void 0 && (test === void 0 || test(node)), message || "Unexpected node.", () => `Node ${formatSyntaxKind(node == null ? void 0 : node.kind)} did not pass test '${getFunctionName(test)}'.`, stackCrawlMark || assertNode);
                        }
                    }