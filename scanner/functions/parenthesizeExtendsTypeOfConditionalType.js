function parenthesizeExtendsTypeOfConditionalType(extendsType) {
                switch (extendsType.kind) {
                    case 191 /* ConditionalType */:
                        return factory2.createParenthesizedType(extendsType);
                }
                return extendsType;
            }