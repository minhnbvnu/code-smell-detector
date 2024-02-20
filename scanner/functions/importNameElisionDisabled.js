function importNameElisionDisabled(options) {
            return options.verbatimModuleSyntax || options.isolatedModules && options.preserveValueImports;
        }