function getRightHandSideOfAssignment(rightHandSide) {
            while (rightHandSide.kind === 214 /* ParenthesizedExpression */) {
                rightHandSide = rightHandSide.expression;
            }
            switch (rightHandSide.kind) {
                case 215 /* FunctionExpression */:
                case 216 /* ArrowFunction */:
                    return rightHandSide;
                case 228 /* ClassExpression */:
                    return find(rightHandSide.members, isConstructorDeclaration);
            }
        }