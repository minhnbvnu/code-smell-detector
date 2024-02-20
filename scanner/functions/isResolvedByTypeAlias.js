function isResolvedByTypeAlias(node) {
                const parent2 = node.parent;
                switch (parent2.kind) {
                    case 193 /* ParenthesizedType */:
                    case 199 /* NamedTupleMember */:
                    case 180 /* TypeReference */:
                    case 189 /* UnionType */:
                    case 190 /* IntersectionType */:
                    case 196 /* IndexedAccessType */:
                    case 191 /* ConditionalType */:
                    case 195 /* TypeOperator */:
                    case 185 /* ArrayType */:
                    case 186 /* TupleType */:
                        return isResolvedByTypeAlias(parent2);
                    case 262 /* TypeAliasDeclaration */:
                        return true;
                }
                return false;
            }