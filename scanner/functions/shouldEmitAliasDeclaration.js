function shouldEmitAliasDeclaration(node) {
                return compilerOptions.verbatimModuleSyntax || isInJSFile(node) || (compilerOptions.preserveValueImports ? resolver.isValueAliasDeclaration(node) : resolver.isReferencedAliasDeclaration(node));
            }