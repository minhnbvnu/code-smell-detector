function checkRightHandSideOfForOf(statement) {
                const use = statement.awaitModifier ? 15 /* ForAwaitOf */ : 13 /* ForOf */;
                return checkIteratedTypeOrElementType(use, checkNonNullExpression(statement.expression), undefinedType, statement.expression);
            }