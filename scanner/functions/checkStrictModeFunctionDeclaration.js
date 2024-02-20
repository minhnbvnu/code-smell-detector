function checkStrictModeFunctionDeclaration(node) {
                if (languageVersion < 2 /* ES2015 */) {
                    if (blockScopeContainer.kind !== 308 /* SourceFile */ && blockScopeContainer.kind !== 264 /* ModuleDeclaration */ && !isFunctionLikeOrClassStaticBlockDeclaration(blockScopeContainer)) {
                        const errorSpan = getErrorSpanForNode(file, node);
                        file.bindDiagnostics.push(createFileDiagnostic(file, errorSpan.start, errorSpan.length, getStrictModeBlockScopeFunctionDeclarationMessage(node)));
                    }
                }
            }