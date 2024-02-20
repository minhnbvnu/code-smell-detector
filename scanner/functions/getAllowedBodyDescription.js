function getAllowedBodyDescription(node) {
        let { parent } = node;
        while (parent) {
            if (parent.type === "StaticBlock") {
                return "class static block body";
            }
            if (astUtils.isFunction(parent)) {
                return "function body";
            }
            ({ parent } = parent);
        }
        return "program";
    }