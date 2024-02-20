function isExternalModuleAugmentation(node) {
            return isAmbientModule(node) && isModuleAugmentationExternal(node);
        }