function emitConstructorType(node) {
                pushNameGenerationScope(node);
                emitModifierList(node, node.modifiers);
                writeKeyword("new");
                writeSpace();
                emitTypeParameters(node, node.typeParameters);
                emitParameters(node, node.parameters);
                writeSpace();
                writePunctuation("=>");
                writeSpace();
                emit(node.type);
                popNameGenerationScope(node);
            }