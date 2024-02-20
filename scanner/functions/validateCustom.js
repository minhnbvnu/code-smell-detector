function validateCustom(config, name, node, originalName) {
            const custom = config.custom;
            if (!custom) {
                return true;
            }
            const result = custom.regex.test(name);
            if (custom.match && result) {
                return true;
            }
            if (!custom.match && !result) {
                return true;
            }
            context.report({
                node,
                messageId: 'satisfyCustom',
                data: formatReportData({
                    originalName,
                    custom,
                }),
            });
            return false;
        }