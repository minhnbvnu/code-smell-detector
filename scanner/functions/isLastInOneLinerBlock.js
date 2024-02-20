function isLastInOneLinerBlock(node) {
                const parent = node.parent;
                const nextToken = sourceCode.getTokenAfter(node);
                if (!nextToken || nextToken.value !== "}") {
                    return false;
                }
                if (parent.type === "BlockStatement") {
                    return parent.loc.start.line === parent.loc.end.line;
                }
                if (parent.type === "StaticBlock") {
                    const openingBrace = sourceCode.getFirstToken(parent, { skip: 1 }); // skip the `static` token
                    return openingBrace.loc.start.line === parent.loc.end.line;
                }
                return false;
            }