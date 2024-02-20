function shouldResolveJsRequire(compilerOptions) {
            return !!compilerOptions.noDtsResolution || getEmitModuleResolutionKind(compilerOptions) !== 100 /* Bundler */;
        }