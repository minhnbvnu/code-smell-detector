function isMethodWhichHasThisArg(node) {
        return isSpecificMemberAccess(node, null, arrayMethodPattern);
    }