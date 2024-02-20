function isMethodAccessForCall(node) {
                while (node.parent.kind === 214 /* ParenthesizedExpression */) {
                    node = node.parent;
                }
                return isCallOrNewExpression(node.parent) && node.parent.expression === node;
            }