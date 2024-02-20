function isReadonlyTypeOperator(node) {
                        return node.kind === 146 /* ReadonlyKeyword */ && isTypeOperatorNode(node.parent) && node.parent.operator === 146 /* ReadonlyKeyword */;
                    }