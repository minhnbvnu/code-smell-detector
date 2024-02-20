function shouldGetType(sourceFile, node, position) {
                switch (node.kind) {
                    case 79 /* Identifier */:
                        return !isLabelName(node) && !isTagName(node) && !isConstTypeReference(node.parent);
                    case 208 /* PropertyAccessExpression */:
                    case 163 /* QualifiedName */:
                        return !isInComment(sourceFile, position);
                    case 108 /* ThisKeyword */:
                    case 194 /* ThisType */:
                    case 106 /* SuperKeyword */:
                    case 199 /* NamedTupleMember */:
                        return true;
                    case 233 /* MetaProperty */:
                        return isImportMeta(node);
                    default:
                        return false;
                }
            }