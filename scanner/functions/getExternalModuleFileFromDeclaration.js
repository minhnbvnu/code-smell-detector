function getExternalModuleFileFromDeclaration(declaration) {
                const specifier = declaration.kind === 264 /* ModuleDeclaration */ ? tryCast(declaration.name, isStringLiteral) : getExternalModuleName(declaration);
                const moduleSymbol = resolveExternalModuleNameWorker(specifier, specifier, 
                /*moduleNotFoundError*/
                void 0);
                if (!moduleSymbol) {
                    return void 0;
                }
                return getDeclarationOfKind(moduleSymbol, 308 /* SourceFile */);
            }