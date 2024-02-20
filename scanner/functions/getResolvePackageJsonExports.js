function getResolvePackageJsonExports(compilerOptions) {
            const moduleResolution = getEmitModuleResolutionKind(compilerOptions);
            if (!moduleResolutionSupportsPackageJsonExportsAndImports(moduleResolution)) {
                return false;
            }
            if (compilerOptions.resolvePackageJsonExports !== void 0) {
                return compilerOptions.resolvePackageJsonExports;
            }
            switch (moduleResolution) {
                case 3 /* Node16 */:
                case 99 /* NodeNext */:
                case 100 /* Bundler */:
                    return true;
            }
            return false;
        }