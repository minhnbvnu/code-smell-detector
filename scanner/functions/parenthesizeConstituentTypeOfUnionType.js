function parenthesizeConstituentTypeOfUnionType(type) {
                switch (type.kind) {
                    case 189 /* UnionType */:
                    case 190 /* IntersectionType */:
                        return factory2.createParenthesizedType(type);
                }
                return parenthesizeCheckTypeOfConditionalType(type);
            }