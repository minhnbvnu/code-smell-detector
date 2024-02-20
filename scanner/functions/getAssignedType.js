function getAssignedType(node) {
                const { parent: parent2 } = node;
                switch (parent2.kind) {
                    case 246 /* ForInStatement */:
                        return stringType;
                    case 247 /* ForOfStatement */:
                        return checkRightHandSideOfForOf(parent2) || errorType;
                    case 223 /* BinaryExpression */:
                        return getAssignedTypeOfBinaryExpression(parent2);
                    case 217 /* DeleteExpression */:
                        return undefinedType;
                    case 206 /* ArrayLiteralExpression */:
                        return getAssignedTypeOfArrayLiteralElement(parent2, node);
                    case 227 /* SpreadElement */:
                        return getAssignedTypeOfSpreadExpression(parent2);
                    case 299 /* PropertyAssignment */:
                        return getAssignedTypeOfPropertyAssignment(parent2);
                    case 300 /* ShorthandPropertyAssignment */:
                        return getAssignedTypeOfShorthandPropertyAssignment(parent2);
                }
                return errorType;
            }