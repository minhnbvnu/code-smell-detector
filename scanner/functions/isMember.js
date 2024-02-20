function isMember(node, name) {
        return astUtils.isSpecificMemberAccess(node, null, name);
    }