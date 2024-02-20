function isFirstNode(node) {
                const parentType = node.parent.type;
                if (node.parent.body) {
                    return Array.isArray(node.parent.body)
                        ? node.parent.body[0] === node
                        : node.parent.body === node;
                }
                if (parentType === "IfStatement") {
                    return isPrecededByTokens(node, ["else", ")"]);
                }
                if (parentType === "DoWhileStatement") {
                    return isPrecededByTokens(node, ["do"]);
                }
                if (parentType === "SwitchCase") {
                    return isPrecededByTokens(node, [":"]);
                }
                return isPrecededByTokens(node, [")"]);
            }