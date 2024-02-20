function visitExportSpecifier(node) {
                return !node.isTypeOnly && (compilerOptions.verbatimModuleSyntax || resolver.isValueAliasDeclaration(node)) ? node : void 0;
            }