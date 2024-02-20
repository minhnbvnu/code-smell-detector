function moduleResolutionSupportsPackageJsonExportsAndImports(moduleResolution) {
            return moduleResolution >= 3 /* Node16 */ && moduleResolution <= 99 /* NodeNext */ || moduleResolution === 100 /* Bundler */;
        }