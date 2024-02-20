function emitMappedType(node) {
                const emitFlags = getEmitFlags(node);
                writePunctuation("{");
                if (emitFlags & 1 /* SingleLine */) {
                    writeSpace();
                }
                else {
                    writeLine();
                    increaseIndent();
                }
                if (node.readonlyToken) {
                    emit(node.readonlyToken);
                    if (node.readonlyToken.kind !== 146 /* ReadonlyKeyword */) {
                        writeKeyword("readonly");
                    }
                    writeSpace();
                }
                writePunctuation("[");
                pipelineEmit(3 /* MappedTypeParameter */, node.typeParameter);
                if (node.nameType) {
                    writeSpace();
                    writeKeyword("as");
                    writeSpace();
                    emit(node.nameType);
                }
                writePunctuation("]");
                if (node.questionToken) {
                    emit(node.questionToken);
                    if (node.questionToken.kind !== 57 /* QuestionToken */) {
                        writePunctuation("?");
                    }
                }
                writePunctuation(":");
                writeSpace();
                emit(node.type);
                writeTrailingSemicolon();
                if (emitFlags & 1 /* SingleLine */) {
                    writeSpace();
                }
                else {
                    writeLine();
                    decreaseIndent();
                }
                emitList(node, node.members, 2 /* PreserveLines */);
                writePunctuation("}");
            }