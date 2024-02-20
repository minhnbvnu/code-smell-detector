function addTypeParametersTrailingCommaToIgnoreList(node) {
                const paramLength = node.params.length;
                if (paramLength) {
                    const param = node.params[paramLength - 1];
                    const afterToken = sourceCode.getTokenAfter(param);
                    if (afterToken && (0, util_1.isCommaToken)(afterToken)) {
                        ignoredTokens.add(afterToken);
                    }
                }
            }