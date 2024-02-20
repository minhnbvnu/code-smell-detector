function isReusableClassMember(node) {
                        if (node) {
                            switch (node.kind) {
                                case 173 /* Constructor */:
                                case 178 /* IndexSignature */:
                                case 174 /* GetAccessor */:
                                case 175 /* SetAccessor */:
                                case 169 /* PropertyDeclaration */:
                                case 237 /* SemicolonClassElement */:
                                    return true;
                                case 171 /* MethodDeclaration */:
                                    const methodDeclaration = node;
                                    const nameIsConstructor = methodDeclaration.name.kind === 79 /* Identifier */ && methodDeclaration.name.escapedText === "constructor";
                                    return !nameIsConstructor;
                            }
                        }
                        return false;
                    }