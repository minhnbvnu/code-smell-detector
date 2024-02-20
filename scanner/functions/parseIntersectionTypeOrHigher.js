function parseIntersectionTypeOrHigher() {
                        return parseUnionOrIntersectionType(50 /* AmpersandToken */, parseTypeOperatorOrHigher, factory2.createIntersectionTypeNode);
                    }