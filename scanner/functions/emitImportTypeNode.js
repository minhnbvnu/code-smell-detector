function emitImportTypeNode(node) {
                if (node.isTypeOf) {
                    writeKeyword("typeof");
                    writeSpace();
                }
                writeKeyword("import");
                writePunctuation("(");
                emit(node.argument);
                if (node.assertions) {
                    writePunctuation(",");
                    writeSpace();
                    writePunctuation("{");
                    writeSpace();
                    writeKeyword("assert");
                    writePunctuation(":");
                    writeSpace();
                    const elements = node.assertions.assertClause.elements;
                    emitList(node.assertions.assertClause, elements, 526226 /* ImportClauseEntries */);
                    writeSpace();
                    writePunctuation("}");
                }
                writePunctuation(")");
                if (node.qualifier) {
                    writePunctuation(".");
                    emit(node.qualifier);
                }
                emitTypeArguments(node, node.typeArguments);
            }