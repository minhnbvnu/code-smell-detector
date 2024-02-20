function parseTypeOrTypePredicate() {
                        const pos = getNodePos();
                        const typePredicateVariable = isIdentifier2() && tryParse(parseTypePredicatePrefix);
                        const type = parseType();
                        if (typePredicateVariable) {
                            return finishNode(factory2.createTypePredicateNode(
                            /*assertsModifier*/
                            void 0, typePredicateVariable, type), pos);
                        }
                        else {
                            return type;
                        }
                    }