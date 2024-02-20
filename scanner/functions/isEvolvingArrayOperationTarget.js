function isEvolvingArrayOperationTarget(node) {
                const root = getReferenceRoot(node);
                const parent2 = root.parent;
                const isLengthPushOrUnshift = isPropertyAccessExpression(parent2) && (parent2.name.escapedText === "length" || parent2.parent.kind === 210 /* CallExpression */ && isIdentifier(parent2.name) && isPushOrUnshiftIdentifier(parent2.name));
                const isElementAssignment = parent2.kind === 209 /* ElementAccessExpression */ && parent2.expression === root && parent2.parent.kind === 223 /* BinaryExpression */ && parent2.parent.operatorToken.kind === 63 /* EqualsToken */ && parent2.parent.left === parent2 && !isAssignmentTarget(parent2.parent) && isTypeAssignableToKind(getTypeOfExpression(parent2.argumentExpression), 296 /* NumberLike */);
                return isLengthPushOrUnshift || isElementAssignment;
            }