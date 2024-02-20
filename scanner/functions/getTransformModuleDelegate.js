function getTransformModuleDelegate(moduleKind2) {
                switch (moduleKind2) {
                    case 2 /* AMD */:
                        return transformAMDModule;
                    case 3 /* UMD */:
                        return transformUMDModule;
                    default:
                        return transformCommonJSModule;
                }
            }