function createCheckedValue(left, right) {
                return factory.createLogicalAnd(factory.createStrictInequality(factory.createTypeOfExpression(left), factory.createStringLiteral("undefined")), right);
            }