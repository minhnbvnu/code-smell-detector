function getModuleTransformer(moduleKind) {
            switch (moduleKind) {
                case 99 /* ESNext */:
                case 7 /* ES2022 */:
                case 6 /* ES2020 */:
                case 5 /* ES2015 */:
                    return transformECMAScriptModule;
                case 4 /* System */:
                    return transformSystemModule;
                case 100 /* Node16 */:
                case 199 /* NodeNext */:
                    return transformNodeModule;
                default:
                    return transformModule;
            }
        }