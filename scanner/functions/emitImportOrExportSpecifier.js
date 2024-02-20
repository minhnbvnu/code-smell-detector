function emitImportOrExportSpecifier(node) {
                if (node.isTypeOnly) {
                    writeKeyword("type");
                    writeSpace();
                }
                if (node.propertyName) {
                    emit(node.propertyName);
                    writeSpace();
                    emitTokenWithComment(128 /* AsKeyword */, node.propertyName.end, writeKeyword, node);
                    writeSpace();
                }
                emit(node.name);
            }