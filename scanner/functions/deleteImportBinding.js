function deleteImportBinding(changes, sourceFile, node) {
                        if (node.parent.name) {
                            const previousToken = Debug.checkDefined(getTokenAtPosition(sourceFile, node.pos - 1));
                            changes.deleteRange(sourceFile, { pos: previousToken.getStart(sourceFile), end: node.end });
                        }
                        else {
                            const importDecl = getAncestor(node, 269 /* ImportDeclaration */);
                            deleteNode(changes, sourceFile, importDecl);
                        }
                    }