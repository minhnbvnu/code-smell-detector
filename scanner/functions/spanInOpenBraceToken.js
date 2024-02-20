function spanInOpenBraceToken(node2) {
                    switch (node2.parent.kind) {
                        case 263 /* EnumDeclaration */:
                            const enumDeclaration = node2.parent;
                            return spanInNodeIfStartsOnSameLine(findPrecedingToken(node2.pos, sourceFile, node2.parent), enumDeclaration.members.length ? enumDeclaration.members[0] : enumDeclaration.getLastToken(sourceFile));
                        case 260 /* ClassDeclaration */:
                            const classDeclaration = node2.parent;
                            return spanInNodeIfStartsOnSameLine(findPrecedingToken(node2.pos, sourceFile, node2.parent), classDeclaration.members.length ? classDeclaration.members[0] : classDeclaration.getLastToken(sourceFile));
                        case 266 /* CaseBlock */:
                            return spanInNodeIfStartsOnSameLine(node2.parent.parent, node2.parent.clauses[0]);
                    }
                    return spanInNode(node2.parent);
                }