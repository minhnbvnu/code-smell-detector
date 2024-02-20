function getNodeResolutionFeatures(options) {
            let features = 0 /* None */;
            switch (getEmitModuleResolutionKind(options)) {
                case 3 /* Node16 */:
                    features = 30 /* Node16Default */;
                    break;
                case 99 /* NodeNext */:
                    features = 30 /* NodeNextDefault */;
                    break;
                case 100 /* Bundler */:
                    features = 30 /* BundlerDefault */;
                    break;
            }
            if (options.resolvePackageJsonExports) {
                features |= 8 /* Exports */;
            }
            else if (options.resolvePackageJsonExports === false) {
                features &= ~8 /* Exports */;
            }
            if (options.resolvePackageJsonImports) {
                features |= 2 /* Imports */;
            }
            else if (options.resolvePackageJsonImports === false) {
                features &= ~2 /* Imports */;
            }
            return features;
        }