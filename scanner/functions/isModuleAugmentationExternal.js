function isModuleAugmentationExternal(node) {
            switch (node.parent.kind) {
                case 308 /* SourceFile */:
                    return isExternalModule(node.parent);
                case 265 /* ModuleBlock */:
                    return isAmbientModule(node.parent.parent) && isSourceFile(node.parent.parent.parent) && !isExternalModule(node.parent.parent.parent);
            }
            return false;
        }