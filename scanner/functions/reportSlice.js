function reportSlice(nodes, start, end, messageId, fix) {
                nodes.slice(start, end).forEach(node => {
                    context.report({ node, messageId, fix: fix ? getFixFunction(node) : null });
                });
            }