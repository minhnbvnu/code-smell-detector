function isArrayFromMethod(node) {
        return isSpecificMemberAccess(node, arrayOrTypedArrayPattern, "from");
    }