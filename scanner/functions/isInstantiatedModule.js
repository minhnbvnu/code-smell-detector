function isInstantiatedModule(node, preserveConstEnums) {
            const moduleState = getModuleInstanceState(node);
            return moduleState === 1 /* Instantiated */ || preserveConstEnums && moduleState === 2 /* ConstEnumOnly */;
        }