function trySubstituteNamespaceExportedName(node) {
                if (enabledSubstitutions & applicableSubstitutions && !isGeneratedIdentifier(node) && !isLocalName(node)) {
                    const container = resolver.getReferencedExportContainer(node, 
                    /*prefixLocals*/
                    false);
                    if (container && container.kind !== 308 /* SourceFile */) {
                        const substitute = applicableSubstitutions & 2 /* NamespaceExports */ && container.kind === 264 /* ModuleDeclaration */ || applicableSubstitutions & 8 /* NonQualifiedEnumMembers */ && container.kind === 263 /* EnumDeclaration */;
                        if (substitute) {
                            return setTextRange(factory2.createPropertyAccessExpression(factory2.getGeneratedNameForNode(container), node), 
                            /*location*/
                            node);
                        }
                    }
                }
                return void 0;
            }