function getRules(rules, node) {
        var _a;
        const scope = (_a = node === null || node === void 0 ? void 0 : node.parent) === null || _a === void 0 ? void 0 : _a.parent;
        if ((0, util_1.isTSFunctionType)(scope) || (0, util_1.isTSConstructorType)(scope)) {
            return rules.arrow;
        }
        else if ((0, util_1.isIdentifier)(scope)) {
            return getIdentifierRules(rules, scope);
        }
        else if ((0, util_1.isClassOrTypeElement)(scope)) {
            return rules.property;
        }
        else if ((0, util_1.isFunction)(scope)) {
            return rules.returnType;
        }
        else {
            return rules.colon;
        }
    }