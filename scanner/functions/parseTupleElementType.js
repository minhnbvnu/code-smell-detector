function parseTupleElementType() {
                        const pos = getNodePos();
                        if (parseOptional(25 /* DotDotDotToken */)) {
                            return finishNode(factory2.createRestTypeNode(parseType()), pos);
                        }
                        const type = parseType();
                        if (isJSDocNullableType(type) && type.pos === type.type.pos) {
                            const node = factory2.createOptionalTypeNode(type.type);
                            setTextRange(node, type);
                            node.flags = type.flags;
                            return node;
                        }
                        return type;
                    }