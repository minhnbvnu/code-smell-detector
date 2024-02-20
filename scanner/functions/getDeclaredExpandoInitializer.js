function getDeclaredExpandoInitializer(node) {
            const init = getEffectiveInitializer(node);
            return init && getExpandoInitializer(init, isPrototypeAccess(node.name));
        }