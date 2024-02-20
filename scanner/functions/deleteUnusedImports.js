function deleteUnusedImports(sourceFile, importDecl, changes, isUnused) {
            switch (importDecl.kind) {
                case 269 /* ImportDeclaration */:
                    deleteUnusedImportsInDeclaration(sourceFile, importDecl, changes, isUnused);
                    break;
                case 268 /* ImportEqualsDeclaration */:
                    if (isUnused(importDecl.name)) {
                        changes.delete(sourceFile, importDecl);
                    }
                    break;
                case 257 /* VariableDeclaration */:
                    deleteUnusedImportsInVariableDeclaration(sourceFile, importDecl, changes, isUnused);
                    break;
                default:
                    Debug.assertNever(importDecl, `Unexpected import decl kind ${importDecl.kind}`);
            }
        }