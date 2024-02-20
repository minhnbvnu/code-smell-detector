function convertToTree(n) {
            return {
                text: getItemName(n.node, n.name),
                kind: getNodeKind(n.node),
                kindModifiers: getModifiers2(n.node),
                spans: getSpans(n),
                nameSpan: n.name && getNodeSpan(n.name),
                childItems: map(n.children, convertToTree)
            };
        }