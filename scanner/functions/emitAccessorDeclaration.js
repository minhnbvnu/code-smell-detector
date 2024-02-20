function emitAccessorDeclaration(node) {
                const pos = emitDecoratorsAndModifiers(node, node.modifiers, 
                /*allowDecorators*/
                true);
                const token = node.kind === 174 /* GetAccessor */ ? 137 /* GetKeyword */ : 151 /* SetKeyword */;
                emitTokenWithComment(token, pos, writeKeyword, node);
                writeSpace();
                emit(node.name);
                emitSignatureAndBody(node, emitSignatureHead);
            }