function validateUnderscore(position, config, name, node, originalName) {
            const option = position === 'leading'
                ? config.leadingUnderscore
                : config.trailingUnderscore;
            if (!option) {
                return name;
            }
            const hasSingleUnderscore = position === 'leading'
                ? () => name.startsWith('_')
                : () => name.endsWith('_');
            const trimSingleUnderscore = position === 'leading'
                ? () => name.slice(1)
                : () => name.slice(0, -1);
            const hasDoubleUnderscore = position === 'leading'
                ? () => name.startsWith('__')
                : () => name.endsWith('__');
            const trimDoubleUnderscore = position === 'leading'
                ? () => name.slice(2)
                : () => name.slice(0, -2);
            switch (option) {
                // ALLOW - no conditions as the user doesn't care if it's there or not
                case enums_1.UnderscoreOptions.allow: {
                    if (hasSingleUnderscore()) {
                        return trimSingleUnderscore();
                    }
                    return name;
                }
                case enums_1.UnderscoreOptions.allowDouble: {
                    if (hasDoubleUnderscore()) {
                        return trimDoubleUnderscore();
                    }
                    return name;
                }
                case enums_1.UnderscoreOptions.allowSingleOrDouble: {
                    if (hasDoubleUnderscore()) {
                        return trimDoubleUnderscore();
                    }
                    if (hasSingleUnderscore()) {
                        return trimSingleUnderscore();
                    }
                    return name;
                }
                // FORBID
                case enums_1.UnderscoreOptions.forbid: {
                    if (hasSingleUnderscore()) {
                        context.report({
                            node,
                            messageId: 'unexpectedUnderscore',
                            data: formatReportData({
                                originalName,
                                position,
                                count: 'one',
                            }),
                        });
                        return null;
                    }
                    return name;
                }
                // REQUIRE
                case enums_1.UnderscoreOptions.require: {
                    if (!hasSingleUnderscore()) {
                        context.report({
                            node,
                            messageId: 'missingUnderscore',
                            data: formatReportData({
                                originalName,
                                position,
                                count: 'one',
                            }),
                        });
                        return null;
                    }
                    return trimSingleUnderscore();
                }
                case enums_1.UnderscoreOptions.requireDouble: {
                    if (!hasDoubleUnderscore()) {
                        context.report({
                            node,
                            messageId: 'missingUnderscore',
                            data: formatReportData({
                                originalName,
                                position,
                                count: 'two',
                            }),
                        });
                        return null;
                    }
                    return trimDoubleUnderscore();
                }
            }
        }