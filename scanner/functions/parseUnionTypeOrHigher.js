function parseUnionTypeOrHigher() {
                        return parseUnionOrIntersectionType(51 /* BarToken */, parseIntersectionTypeOrHigher, factory2.createUnionTypeNode);
                    }