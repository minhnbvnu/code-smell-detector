function isTargetMethod(node) {
        return astUtils.isSpecificMemberAccess(node, null, TARGET_METHODS);
    }