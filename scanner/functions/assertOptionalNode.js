function assertOptionalNode(node, test, message, stackCrawlMark) {
                        if (shouldAssertFunction(1 /* Normal */, "assertOptionalNode")) {
                            assert(test === void 0 || node === void 0 || test(node), message || "Unexpected node.", () => `Node ${formatSyntaxKind(node == null ? void 0 : node.kind)} did not pass test '${getFunctionName(test)}'.`, stackCrawlMark || assertOptionalNode);
                        }
                    }