function emitHeritageClause(node) {
                writeSpace();
                writeTokenText(node.token, writeKeyword);
                writeSpace();
                emitList(node, node.types, 528 /* HeritageClauseTypes */);
            }