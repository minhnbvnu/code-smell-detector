function spanInBlock(block) {
                    switch (block.parent.kind) {
                        case 264 /* ModuleDeclaration */:
                            if (getModuleInstanceState(block.parent) !== 1 /* Instantiated */) {
                                return void 0;
                            }
                        case 244 /* WhileStatement */:
                        case 242 /* IfStatement */:
                        case 246 /* ForInStatement */:
                            return spanInNodeIfStartsOnSameLine(block.parent, block.statements[0]);
                        case 245 /* ForStatement */:
                        case 247 /* ForOfStatement */:
                            return spanInNodeIfStartsOnSameLine(findPrecedingToken(block.pos, sourceFile, block.parent), block.statements[0]);
                    }
                    return spanInNode(block.statements[0]);
                }