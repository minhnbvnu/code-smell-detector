function resolveHelpersModule(node, errorNode) {
                if (!externalHelpersModule) {
                    externalHelpersModule = resolveExternalModule(node, externalHelpersModuleNameText, Diagnostics.This_syntax_requires_an_imported_helper_but_module_0_cannot_be_found, errorNode) || unknownSymbol;
                }
                return externalHelpersModule;
            }