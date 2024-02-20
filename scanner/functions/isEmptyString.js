function isEmptyString(node) {
        return astUtils.isStringLiteral(node) && (node.value === "" || (node.type === "TemplateLiteral" && node.quasis.length === 1 && node.quasis[0].value.cooked === ""));
    }