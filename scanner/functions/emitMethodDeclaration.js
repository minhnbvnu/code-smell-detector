function emitMethodDeclaration(node) {
                emitDecoratorsAndModifiers(node, node.modifiers, 
                /*allowDecorators*/
                true);
                emit(node.asteriskToken);
                emit(node.name);
                emit(node.questionToken);
                emitSignatureAndBody(node, emitSignatureHead);
            }