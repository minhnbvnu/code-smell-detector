function isEffectiveExternalModule(node, compilerOptions) {
            return isExternalModule(node) || getIsolatedModules(compilerOptions) || isCommonJSContainingModuleKind(getEmitModuleKind(compilerOptions)) && !!node.commonJsModuleIndicator;
        }