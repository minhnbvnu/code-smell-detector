function isNaNIdentifier(node) {
        return Boolean(node) && (astUtils.isSpecificId(node, "NaN") ||
            astUtils.isSpecificMemberAccess(node, "Number", "NaN"));
    }