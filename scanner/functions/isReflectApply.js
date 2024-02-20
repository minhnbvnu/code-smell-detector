function isReflectApply(node) {
        return isSpecificMemberAccess(node, "Reflect", "apply");
    }