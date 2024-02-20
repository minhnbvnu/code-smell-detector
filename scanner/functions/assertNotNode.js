function assertNotNode(node, test, message, stackCrawlMark) {
                        if (shouldAssertFunction(1 /* Normal */, "assertNotNode")) {
                            assert(node === void 0 || test === void 0 || !test(node), message || "Unexpected node.", () => `Node ${formatSyntaxKind(node.kind)} should not have passed test '${getFunctionName(test)}'.`, stackCrawlMark || assertNotNode);
                        }
                    }