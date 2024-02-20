function getArrayElementTypeNode(node) {
                switch (node.kind) {
                    case 193 /* ParenthesizedType */:
                        return getArrayElementTypeNode(node.type);
                    case 186 /* TupleType */:
                        if (node.elements.length === 1) {
                            node = node.elements[0];
                            if (node.kind === 188 /* RestType */ || node.kind === 199 /* NamedTupleMember */ && node.dotDotDotToken) {
                                return getArrayElementTypeNode(node.type);
                            }
                        }
                        break;
                    case 185 /* ArrayType */:
                        return node.elementType;
                }
                return void 0;
            }