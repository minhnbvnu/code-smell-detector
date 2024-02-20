function parseModuleOrNamespaceDeclaration(pos, hasJSDoc, modifiers, flags) {
                        const namespaceFlag = flags & 16 /* Namespace */;
                        const name = parseIdentifier();
                        const body = parseOptional(24 /* DotToken */) ? parseModuleOrNamespaceDeclaration(getNodePos(), 
                        /*hasJSDoc*/
                        false, 
                        /*modifiers*/
                        void 0, 4 /* NestedNamespace */ | namespaceFlag) : parseModuleBlock();
                        const node = factory2.createModuleDeclaration(modifiers, name, body, flags);
                        return withJSDoc(finishNode(node, pos), hasJSDoc);
                    }