function isConstraintPosition(type, node) {
                const parent2 = node.parent;
                return parent2.kind === 208 /* PropertyAccessExpression */ || parent2.kind === 163 /* QualifiedName */ || parent2.kind === 210 /* CallExpression */ && parent2.expression === node || parent2.kind === 209 /* ElementAccessExpression */ && parent2.expression === node && !(someType(type, isGenericTypeWithoutNullableConstraint) && isGenericIndexType(getTypeOfExpression(parent2.argumentExpression)));
            }