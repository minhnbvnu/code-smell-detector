function fileIsGlobalOnly(file) {
                return !file.commonJsModuleIndicator && !file.externalModuleIndicator && !file.moduleAugmentations && !file.ambientModuleNames;
            }