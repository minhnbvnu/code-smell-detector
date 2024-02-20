function convertToSecondaryNavBarMenuItem(n2) {
                return {
                    text: getItemName(n2.node, n2.name),
                    kind: getNodeKind(n2.node),
                    kindModifiers: getNodeModifiers(n2.node),
                    spans: getSpans(n2),
                    childItems: emptyChildItemArray,
                    indent: 0,
                    bolded: false,
                    grayed: false
                };
            }