function serializeAsFunctionNamespaceMerge(type, symbol, localName, modifierFlags) {
                        const signatures = getSignaturesOfType(type, 0 /* Call */);
                        for (const sig of signatures) {
                            const decl = signatureToSignatureDeclarationHelper(sig, 259 /* FunctionDeclaration */, context, { name: factory.createIdentifier(localName), privateSymbolVisitor: includePrivateSymbol, bundledImports: bundled });
                            addResult(setTextRange(decl, getSignatureTextRangeLocation(sig)), modifierFlags);
                        }
                        if (!(symbol.flags & (512 /* ValueModule */ | 1024 /* NamespaceModule */) && !!symbol.exports && !!symbol.exports.size)) {
                            const props = filter(getPropertiesOfType(type), isNamespaceMember);
                            serializeAsNamespaceDeclaration(props, localName, modifierFlags, 
                            /*suppressNewPrivateContext*/
                            true);
                        }
                    }