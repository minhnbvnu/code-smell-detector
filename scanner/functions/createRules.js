function createRules(options) {
        var _a;
        const globals = Object.assign(Object.assign({}, ((options === null || options === void 0 ? void 0 : options.before) !== undefined ? { before: options.before } : {})), ((options === null || options === void 0 ? void 0 : options.after) !== undefined ? { after: options.after } : {}));
        const override = (_a = options === null || options === void 0 ? void 0 : options.overrides) !== null && _a !== void 0 ? _a : {};
        const colon = Object.assign(Object.assign({ before: false, after: true }, globals), override === null || override === void 0 ? void 0 : override.colon);
        const arrow = Object.assign(Object.assign({ before: true, after: true }, globals), override === null || override === void 0 ? void 0 : override.arrow);
        return {
            colon: colon,
            arrow: arrow,
            variable: Object.assign(Object.assign({}, colon), override === null || override === void 0 ? void 0 : override.variable),
            property: Object.assign(Object.assign({}, colon), override === null || override === void 0 ? void 0 : override.property),
            parameter: Object.assign(Object.assign({}, colon), override === null || override === void 0 ? void 0 : override.parameter),
            returnType: Object.assign(Object.assign({}, colon), override === null || override === void 0 ? void 0 : override.returnType),
        };
    }