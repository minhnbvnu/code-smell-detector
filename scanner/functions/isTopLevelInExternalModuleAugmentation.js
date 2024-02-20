function isTopLevelInExternalModuleAugmentation(node) {
                return node && node.parent && node.parent.kind === 265 /* ModuleBlock */ && isExternalModuleAugmentation(node.parent.parent);
            }