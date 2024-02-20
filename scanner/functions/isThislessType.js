function isThislessType(node) {
                switch (node.kind) {
                    case 131 /* AnyKeyword */:
                    case 157 /* UnknownKeyword */:
                    case 152 /* StringKeyword */:
                    case 148 /* NumberKeyword */:
                    case 160 /* BigIntKeyword */:
                    case 134 /* BooleanKeyword */:
                    case 153 /* SymbolKeyword */:
                    case 149 /* ObjectKeyword */:
                    case 114 /* VoidKeyword */:
                    case 155 /* UndefinedKeyword */:
                    case 144 /* NeverKeyword */:
                    case 198 /* LiteralType */:
                        return true;
                    case 185 /* ArrayType */:
                        return isThislessType(node.elementType);
                    case 180 /* TypeReference */:
                        return !node.typeArguments || node.typeArguments.every(isThislessType);
                }
                return false;
            }