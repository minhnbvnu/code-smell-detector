function parenthesizeOperandOfTypeOperator(type) {
                switch (type.kind) {
                    case 190 /* IntersectionType */:
                        return factory2.createParenthesizedType(type);
                }
                return parenthesizeConstituentTypeOfIntersectionType(type);
            }