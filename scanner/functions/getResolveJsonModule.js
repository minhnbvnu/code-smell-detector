function getResolveJsonModule(compilerOptions) {
            if (compilerOptions.resolveJsonModule !== void 0) {
                return compilerOptions.resolveJsonModule;
            }
            return getEmitModuleResolutionKind(compilerOptions) === 100 /* Bundler */;
        }