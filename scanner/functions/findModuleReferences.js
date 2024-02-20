function findModuleReferences(program, sourceFiles, searchModuleSymbol) {
            var _a2;
            const refs = [];
            const checker = program.getTypeChecker();
            for (const referencingFile of sourceFiles) {
                const searchSourceFile = searchModuleSymbol.valueDeclaration;
                if ((searchSourceFile == null ? void 0 : searchSourceFile.kind) === 308 /* SourceFile */) {
                    for (const ref of referencingFile.referencedFiles) {
                        if (program.getSourceFileFromReference(referencingFile, ref) === searchSourceFile) {
                            refs.push({ kind: "reference", referencingFile, ref });
                        }
                    }
                    for (const ref of referencingFile.typeReferenceDirectives) {
                        const referenced = (_a2 = program.getResolvedTypeReferenceDirectives().get(ref.fileName, ref.resolutionMode || referencingFile.impliedNodeFormat)) == null ? void 0 : _a2.resolvedTypeReferenceDirective;
                        if (referenced !== void 0 && referenced.resolvedFileName === searchSourceFile.fileName) {
                            refs.push({ kind: "reference", referencingFile, ref });
                        }
                    }
                }
                forEachImport(referencingFile, (_importDecl, moduleSpecifier) => {
                    const moduleSymbol = checker.getSymbolAtLocation(moduleSpecifier);
                    if (moduleSymbol === searchModuleSymbol) {
                        refs.push({ kind: "import", literal: moduleSpecifier });
                    }
                });
            }
            return refs;
        }