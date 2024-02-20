function getTupleElementFlags(node) {
                switch (node.kind) {
                    case 187 /* OptionalType */:
                        return 2 /* Optional */;
                    case 188 /* RestType */:
                        return getRestTypeElementFlags(node);
                    case 199 /* NamedTupleMember */:
                        return node.questionToken ? 2 /* Optional */ : node.dotDotDotToken ? getRestTypeElementFlags(node) : 1 /* Required */;
                    default:
                        return 1 /* Required */;
                }
            }