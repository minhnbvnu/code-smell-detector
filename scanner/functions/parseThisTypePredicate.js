function parseThisTypePredicate(lhs) {
                        nextToken();
                        return finishNode(factory2.createTypePredicateNode(
                        /*assertsModifier*/
                        void 0, lhs, parseType()), lhs.pos);
                    }