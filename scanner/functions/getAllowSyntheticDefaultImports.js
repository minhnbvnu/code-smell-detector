function getAllowSyntheticDefaultImports(compilerOptions) {
            if (compilerOptions.allowSyntheticDefaultImports !== void 0) {
                return compilerOptions.allowSyntheticDefaultImports;
            }
            return getESModuleInterop(compilerOptions) || getEmitModuleKind(compilerOptions) === 4 /* System */ || getEmitModuleResolutionKind(compilerOptions) === 100 /* Bundler */;
        }