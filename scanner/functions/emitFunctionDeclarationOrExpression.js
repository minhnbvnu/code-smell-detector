function emitFunctionDeclarationOrExpression(node) {
                emitDecoratorsAndModifiers(node, node.modifiers, 
                /*allowDecorators*/
                false);
                writeKeyword("function");
                emit(node.asteriskToken);
                writeSpace();
                emitIdentifierName(node.name);
                emitSignatureAndBody(node, emitSignatureHead);
            }