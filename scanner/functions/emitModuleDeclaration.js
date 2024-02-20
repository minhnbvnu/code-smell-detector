function emitModuleDeclaration(node) {
                emitDecoratorsAndModifiers(node, node.modifiers, 
                /*allowDecorators*/
                false);
                if (~node.flags & 1024 /* GlobalAugmentation */) {
                    writeKeyword(node.flags & 16 /* Namespace */ ? "namespace" : "module");
                    writeSpace();
                }
                emit(node.name);
                let body = node.body;
                if (!body)
                    return writeTrailingSemicolon();
                while (body && isModuleDeclaration(body)) {
                    writePunctuation(".");
                    emit(body.name);
                    body = body.body;
                }
                writeSpace();
                emit(body);
            }