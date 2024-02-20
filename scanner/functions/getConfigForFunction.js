function getConfigForFunction(node) {
                var _a, _b, _c;
                if (node.type === utils_1.AST_NODE_TYPES.ArrowFunctionExpression) {
                    // Always ignore non-async functions and arrow functions without parens, e.g. async foo => bar
                    if (node.async &&
                        util.isOpeningParenToken(sourceCode.getFirstToken(node, { skip: 1 }))) {
                        return (_a = overrideConfig.asyncArrow) !== null && _a !== void 0 ? _a : baseConfig;
                    }
                }
                else if (isNamedFunction(node)) {
                    return (_b = overrideConfig.named) !== null && _b !== void 0 ? _b : baseConfig;
                    // `generator-star-spacing` should warn anonymous generators. E.g. `function* () {}`
                }
                else if (!node.generator) {
                    return (_c = overrideConfig.anonymous) !== null && _c !== void 0 ? _c : baseConfig;
                }
                return 'ignore';
            }