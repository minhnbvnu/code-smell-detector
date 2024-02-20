function getEmitModuleResolutionKind(compilerOptions) {
            let moduleResolution = compilerOptions.moduleResolution;
            if (moduleResolution === void 0) {
                switch (getEmitModuleKind(compilerOptions)) {
                    case 1 /* CommonJS */:
                        moduleResolution = 2 /* Node10 */;
                        break;
                    case 100 /* Node16 */:
                        moduleResolution = 3 /* Node16 */;
                        break;
                    case 199 /* NodeNext */:
                        moduleResolution = 99 /* NodeNext */;
                        break;
                    default:
                        moduleResolution = 1 /* Classic */;
                        break;
                }
            }
            return moduleResolution;
        }