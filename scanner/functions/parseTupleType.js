function parseTupleType() {
                        const pos = getNodePos();
                        return finishNode(factory2.createTupleTypeNode(parseBracketedList(21 /* TupleElementTypes */, parseTupleElementNameOrTupleElementType, 22 /* OpenBracketToken */, 23 /* CloseBracketToken */)), pos);
                    }