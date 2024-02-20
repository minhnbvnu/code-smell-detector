function emitNamedTupleMember(node) {
                emit(node.dotDotDotToken);
                emit(node.name);
                emit(node.questionToken);
                emitTokenWithComment(58 /* ColonToken */, node.name.end, writePunctuation, node);
                writeSpace();
                emit(node.type);
            }