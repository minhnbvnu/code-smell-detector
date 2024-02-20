function getIdentifierRules(rules, node) {
        const scope = node === null || node === void 0 ? void 0 : node.parent;
        if ((0, util_1.isVariableDeclarator)(scope)) {
            return rules.variable;
        }
        else if ((0, util_1.isFunctionOrFunctionType)(scope)) {
            return rules.parameter;
        }
        else {
            return rules.colon;
        }
    }