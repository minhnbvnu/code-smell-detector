function failBadSyntaxKind(node, message, stackCrawlMark) {
                        return fail(`${message || "Unexpected node."}\r
Node ${formatSyntaxKind(node.kind)} was unexpected.`, stackCrawlMark || failBadSyntaxKind);
                    }