function assertMissingNode(node, message, stackCrawlMark) {
                        if (shouldAssertFunction(1 /* Normal */, "assertMissingNode")) {
                            assert(node === void 0, message || "Unexpected node.", () => `Node ${formatSyntaxKind(node.kind)} was unexpected'.`, stackCrawlMark || assertMissingNode);
                        }
                    }