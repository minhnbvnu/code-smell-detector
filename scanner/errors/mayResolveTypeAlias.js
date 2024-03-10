function mayResolveTypeAlias(node) {
                switch (node.kind) {
                    case 180 /* TypeReference */:
                        return isJSDocTypeReference(node) || !!(resolveTypeReferenceName(node, 788968 /* Type */).flags & 524288 /* TypeAlias */);
                    case 183 /* TypeQuery */:
                        return true;
                    case 195 /* TypeOperator */:
                        return node.operator !== 156 /* UniqueKeyword */ && mayResolveTypeAlias(node.type);
                    case 193 /* ParenthesizedType */:
                    case 187 /* OptionalType */:
                    case 199 /* NamedTupleMember */:
                    case 319 /* JSDocOptionalType */:
                    case 317 /* JSDocNullableType */:
                    case 318 /* JSDocNonNullableType */:
                    case 312 /* JSDocTypeExpression */:
                        return mayResolveTypeAlias(node.type);
                    case 188 /* RestType */:
                        return node.type.kind !== 185 /* ArrayType */ || mayResolveTypeAlias(node.type.elementType);
                    case 189 /* UnionType */:
                    case 190 /* IntersectionType */:
                        return some(node.types, mayResolveTypeAlias);
                    case 196 /* IndexedAccessType */:
                        return mayResolveTypeAlias(node.objectType) || mayResolveTypeAlias(node.indexType);
                    case 191 /* ConditionalType */:
                        return mayResolveTypeAlias(node.checkType) || mayResolveTypeAlias(node.extendsType) || mayResolveTypeAlias(node.trueType) || mayResolveTypeAlias(node.falseType);
                }
                return false;
            }