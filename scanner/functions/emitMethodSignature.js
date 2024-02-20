function emitMethodSignature(node) {
                pushNameGenerationScope(node);
                emitModifierList(node, node.modifiers);
                emit(node.name);
                emit(node.questionToken);
                emitTypeParameters(node, node.typeParameters);
                emitParameters(node, node.parameters);
                emitTypeAnnotation(node.type);
                writeTrailingSemicolon();
                popNameGenerationScope(node);
            }