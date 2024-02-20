function emitPropertySignature(node) {
                emitModifierList(node, node.modifiers);
                emitNodeWithWriter(node.name, writeProperty);
                emit(node.questionToken);
                emitTypeAnnotation(node.type);
                writeTrailingSemicolon();
            }