function isIndirectCall(node) {
                    return node.parent.kind === 214 /* ParenthesizedExpression */ && isNumericLiteral(node.left) && node.left.text === "0" && (isCallExpression(node.parent.parent) && node.parent.parent.expression === node.parent || node.parent.parent.kind === 212 /* TaggedTemplateExpression */) && // special-case for "eval" because it's the only non-access case where an indirect call actually affects behavior.
                        (isAccessExpression(node.right) || isIdentifier(node.right) && node.right.escapedText === "eval");
                }