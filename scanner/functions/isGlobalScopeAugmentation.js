function isGlobalScopeAugmentation(module2) {
            return !!(module2.flags & 1024 /* GlobalAugmentation */);
        }