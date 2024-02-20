function emitTypeAliasDeclaration(node) {
                emitDecoratorsAndModifiers(node, node.modifiers, 
                /*allowDecorators*/
                false);
                writeKeyword("type");
                writeSpace();
                emit(node.name);
                emitTypeParameters(node, node.typeParameters);
                writeSpace();
                writePunctuation("=");
                writeSpace();
                emit(node.type);
                writeTrailingSemicolon();
            }