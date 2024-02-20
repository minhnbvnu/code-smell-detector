function getTypeWithDefault(type, defaultExpression) {
                return defaultExpression ? getUnionType([getNonUndefinedType(type), getTypeOfExpression(defaultExpression)]) : type;
            }