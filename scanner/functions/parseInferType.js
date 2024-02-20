function parseInferType() {
                        const pos = getNodePos();
                        parseExpected(138 /* InferKeyword */);
                        return finishNode(factory2.createInferTypeNode(parseTypeParameterOfInferType()), pos);
                    }