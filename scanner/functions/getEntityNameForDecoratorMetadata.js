function getEntityNameForDecoratorMetadata(node) {
                if (node) {
                    switch (node.kind) {
                        case 190 /* IntersectionType */:
                        case 189 /* UnionType */:
                            return getEntityNameForDecoratorMetadataFromTypeList(node.types);
                        case 191 /* ConditionalType */:
                            return getEntityNameForDecoratorMetadataFromTypeList([node.trueType, node.falseType]);
                        case 193 /* ParenthesizedType */:
                        case 199 /* NamedTupleMember */:
                            return getEntityNameForDecoratorMetadata(node.type);
                        case 180 /* TypeReference */:
                            return node.typeName;
                    }
                }
            }