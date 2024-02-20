function assertOptionalToken(node, kind, message, stackCrawlMark) {
                        if (shouldAssertFunction(1 /* Normal */, "assertOptionalToken")) {
                            assert(kind === void 0 || node === void 0 || node.kind === kind, message || "Unexpected node.", () => `Node ${formatSyntaxKind(node == null ? void 0 : node.kind)} was not a '${formatSyntaxKind(kind)}' token.`, stackCrawlMark || assertOptionalToken);
                        }
                    }