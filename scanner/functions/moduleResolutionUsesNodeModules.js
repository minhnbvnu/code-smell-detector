function moduleResolutionUsesNodeModules(moduleResolution) {
            return moduleResolution === 2 /* Node10 */ || moduleResolution >= 3 /* Node16 */ && moduleResolution <= 99 /* NodeNext */ || moduleResolution === 100 /* Bundler */;
        }