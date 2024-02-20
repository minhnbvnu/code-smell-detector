function groupByLineNumber(acc, node) {
                for (let i = node.loc.start.line; i <= node.loc.end.line; ++i) {
                    ensureArrayAndPush(acc, i, node);
                }
                return acc;
            }