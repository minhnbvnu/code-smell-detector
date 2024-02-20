function assertNever(member, message = "Illegal value:", stackCrawlMark) {
                        const detail = typeof member === "object" && hasProperty(member, "kind") && hasProperty(member, "pos") ? "SyntaxKind: " + formatSyntaxKind(member.kind) : JSON.stringify(member);
                        return fail(`${message} ${detail}`, stackCrawlMark || assertNever);
                    }