function newKeywordTester(type, keyword) {
        return {
            test(node, sourceCode) {
                var _a;
                const isSameKeyword = ((_a = sourceCode.getFirstToken(node)) === null || _a === void 0 ? void 0 : _a.value) === keyword;
                const isSameType = Array.isArray(type)
                    ? type.some(val => val === node.type)
                    : type === node.type;
                return isSameKeyword && isSameType;
            },
        };
    }