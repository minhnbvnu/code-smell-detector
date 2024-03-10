function serializeTypeNode(node) {
                if (node === void 0) {
                    return factory.createIdentifier("Object");
                }
                node = skipTypeParentheses(node);
                switch (node.kind) {
                    case 114 /* VoidKeyword */:
                    case 155 /* UndefinedKeyword */:
                    case 144 /* NeverKeyword */:
                        return factory.createVoidZero();
                    case 181 /* FunctionType */:
                    case 182 /* ConstructorType */:
                        return factory.createIdentifier("Function");
                    case 185 /* ArrayType */:
                    case 186 /* TupleType */:
                        return factory.createIdentifier("Array");
                    case 179 /* TypePredicate */:
                        return node.assertsModifier ? factory.createVoidZero() : factory.createIdentifier("Boolean");
                    case 134 /* BooleanKeyword */:
                        return factory.createIdentifier("Boolean");
                    case 200 /* TemplateLiteralType */:
                    case 152 /* StringKeyword */:
                        return factory.createIdentifier("String");
                    case 149 /* ObjectKeyword */:
                        return factory.createIdentifier("Object");
                    case 198 /* LiteralType */:
                        return serializeLiteralOfLiteralTypeNode(node.literal);
                    case 148 /* NumberKeyword */:
                        return factory.createIdentifier("Number");
                    case 160 /* BigIntKeyword */:
                        return getGlobalConstructor("BigInt", 7 /* ES2020 */);
                    case 153 /* SymbolKeyword */:
                        return getGlobalConstructor("Symbol", 2 /* ES2015 */);
                    case 180 /* TypeReference */:
                        return serializeTypeReferenceNode(node);
                    case 190 /* IntersectionType */:
                        return serializeUnionOrIntersectionConstituents(node.types, 
                        /*isIntersection*/
                        true);
                    case 189 /* UnionType */:
                        return serializeUnionOrIntersectionConstituents(node.types, 
                        /*isIntersection*/
                        false);
                    case 191 /* ConditionalType */:
                        return serializeUnionOrIntersectionConstituents([node.trueType, node.falseType], 
                        /*isIntersection*/
                        false);
                    case 195 /* TypeOperator */:
                        if (node.operator === 146 /* ReadonlyKeyword */) {
                            return serializeTypeNode(node.type);
                        }
                        break;
                    case 183 /* TypeQuery */:
                    case 196 /* IndexedAccessType */:
                    case 197 /* MappedType */:
                    case 184 /* TypeLiteral */:
                    case 131 /* AnyKeyword */:
                    case 157 /* UnknownKeyword */:
                    case 194 /* ThisType */:
                    case 202 /* ImportType */:
                        break;
                    case 315 /* JSDocAllType */:
                    case 316 /* JSDocUnknownType */:
                    case 320 /* JSDocFunctionType */:
                    case 321 /* JSDocVariadicType */:
                    case 322 /* JSDocNamepathType */:
                        break;
                    case 317 /* JSDocNullableType */:
                    case 318 /* JSDocNonNullableType */:
                    case 319 /* JSDocOptionalType */:
                        return serializeTypeNode(node.type);
                    default:
                        return Debug.failBadSyntaxKind(node);
                }
                return factory.createIdentifier("Object");
            }