function getParserServices(context, allowWithoutFullTypeInformation = false) {
        var _a, _b;
        // backwards compatibility check
        // old versions of the parser would not return any parserServices unless parserOptions.project was set
        if (!((_a = context.parserServices) === null || _a === void 0 ? void 0 : _a.program) ||
            !context.parserServices.esTreeNodeToTSNodeMap ||
            !context.parserServices.tsNodeToESTreeNodeMap) {
            throw new Error(ERROR_MESSAGE);
        }
        const hasFullTypeInformation = (_b = context.parserServices.hasFullTypeInformation) !== null && _b !== void 0 ? _b :
            /* backwards compatible */ true;
        // if a rule requires full type information, then hard fail if it doesn't exist
        // this forces the user to supply parserOptions.project
        if (!hasFullTypeInformation && !allowWithoutFullTypeInformation) {
            throw new Error(ERROR_MESSAGE);
        }
        return context.parserServices;
    }