function containsGlobalScopeAugmentation(sourceFile) {
                        return some(sourceFile.moduleAugmentations, (augmentation) => isGlobalScopeAugmentation(augmentation.parent));
                    }