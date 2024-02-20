function parseHeritageClause() {
                        const pos = getNodePos();
                        const tok = token();
                        Debug.assert(tok === 94 /* ExtendsKeyword */ || tok === 117 /* ImplementsKeyword */);
                        nextToken();
                        const types = parseDelimitedList(7 /* HeritageClauseElement */, parseExpressionWithTypeArguments);
                        return finishNode(factory2.createHeritageClause(tok, types), pos);
                    }