function getTypeFromTypeNodeWorker(node) {
                switch (node.kind) {
                    case 131 /* AnyKeyword */:
                    case 315 /* JSDocAllType */:
                    case 316 /* JSDocUnknownType */:
                        return anyType;
                    case 157 /* UnknownKeyword */:
                        return unknownType;
                    case 152 /* StringKeyword */:
                        return stringType;
                    case 148 /* NumberKeyword */:
                        return numberType;
                    case 160 /* BigIntKeyword */:
                        return bigintType;
                    case 134 /* BooleanKeyword */:
                        return booleanType;
                    case 153 /* SymbolKeyword */:
                        return esSymbolType;
                    case 114 /* VoidKeyword */:
                        return voidType;
                    case 155 /* UndefinedKeyword */:
                        return undefinedType;
                    case 104 /* NullKeyword */:
                        return nullType;
                    case 144 /* NeverKeyword */:
                        return neverType;
                    case 149 /* ObjectKeyword */:
                        return node.flags & 262144 /* JavaScriptFile */ && !noImplicitAny ? anyType : nonPrimitiveType;
                    case 139 /* IntrinsicKeyword */:
                        return intrinsicMarkerType;
                    case 194 /* ThisType */:
                    case 108 /* ThisKeyword */:
                        return getTypeFromThisTypeNode(node);
                    case 198 /* LiteralType */:
                        return getTypeFromLiteralTypeNode(node);
                    case 180 /* TypeReference */:
                        return getTypeFromTypeReference(node);
                    case 179 /* TypePredicate */:
                        return node.assertsModifier ? voidType : booleanType;
                    case 230 /* ExpressionWithTypeArguments */:
                        return getTypeFromTypeReference(node);
                    case 183 /* TypeQuery */:
                        return getTypeFromTypeQueryNode(node);
                    case 185 /* ArrayType */:
                    case 186 /* TupleType */:
                        return getTypeFromArrayOrTupleTypeNode(node);
                    case 187 /* OptionalType */:
                        return getTypeFromOptionalTypeNode(node);
                    case 189 /* UnionType */:
                        return getTypeFromUnionTypeNode(node);
                    case 190 /* IntersectionType */:
                        return getTypeFromIntersectionTypeNode(node);
                    case 317 /* JSDocNullableType */:
                        return getTypeFromJSDocNullableTypeNode(node);
                    case 319 /* JSDocOptionalType */:
                        return addOptionality(getTypeFromTypeNode(node.type));
                    case 199 /* NamedTupleMember */:
                        return getTypeFromNamedTupleTypeNode(node);
                    case 193 /* ParenthesizedType */:
                    case 318 /* JSDocNonNullableType */:
                    case 312 /* JSDocTypeExpression */:
                        return getTypeFromTypeNode(node.type);
                    case 188 /* RestType */:
                        return getTypeFromRestTypeNode(node);
                    case 321 /* JSDocVariadicType */:
                        return getTypeFromJSDocVariadicType(node);
                    case 181 /* FunctionType */:
                    case 182 /* ConstructorType */:
                    case 184 /* TypeLiteral */:
                    case 325 /* JSDocTypeLiteral */:
                    case 320 /* JSDocFunctionType */:
                    case 326 /* JSDocSignature */:
                        return getTypeFromTypeLiteralOrFunctionOrConstructorTypeNode(node);
                    case 195 /* TypeOperator */:
                        return getTypeFromTypeOperatorNode(node);
                    case 196 /* IndexedAccessType */:
                        return getTypeFromIndexedAccessTypeNode(node);
                    case 197 /* MappedType */:
                        return getTypeFromMappedTypeNode(node);
                    case 191 /* ConditionalType */:
                        return getTypeFromConditionalTypeNode(node);
                    case 192 /* InferType */:
                        return getTypeFromInferTypeNode(node);
                    case 200 /* TemplateLiteralType */:
                        return getTypeFromTemplateTypeNode(node);
                    case 202 /* ImportType */:
                        return getTypeFromImportTypeNode(node);
                    case 79 /* Identifier */:
                    case 163 /* QualifiedName */:
                    case 208 /* PropertyAccessExpression */:
                        const symbol = getSymbolAtLocation(node);
                        return symbol ? getDeclaredTypeOfSymbol(symbol) : errorType;
                    default:
                        return errorType;
                }
            }