function isParseInt(calleeNode) {
        return (astUtils.isSpecificId(calleeNode, "parseInt") ||
            astUtils.isSpecificMemberAccess(calleeNode, "Number", "parseInt"));
    }