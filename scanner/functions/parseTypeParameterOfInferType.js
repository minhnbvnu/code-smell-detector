function parseTypeParameterOfInferType() {
                        const pos = getNodePos();
                        const name = parseIdentifier();
                        const constraint = tryParse(tryParseConstraintOfInferType);
                        const node = factory2.createTypeParameterDeclaration(
                        /*modifiers*/
                        void 0, name, constraint);
                        return finishNode(node, pos);
                    }