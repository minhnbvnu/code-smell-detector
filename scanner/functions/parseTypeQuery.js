function parseTypeQuery() {
                        const pos = getNodePos();
                        parseExpected(112 /* TypeOfKeyword */);
                        const entityName = parseEntityName(
                        /*allowReservedWords*/
                        true);
                        const typeArguments = !scanner2.hasPrecedingLineBreak() ? tryParseTypeArguments() : void 0;
                        return finishNode(factory2.createTypeQueryNode(entityName, typeArguments), pos);
                    }