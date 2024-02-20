function assertEachNode(nodes, test, message, stackCrawlMark) {
                        if (shouldAssertFunction(1 /* Normal */, "assertEachNode")) {
                            assert(test === void 0 || every(nodes, test), message || "Unexpected node.", () => `Node array did not pass test '${getFunctionName(test)}'.`, stackCrawlMark || assertEachNode);
                        }
                    }