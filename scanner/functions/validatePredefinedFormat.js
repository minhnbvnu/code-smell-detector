function validatePredefinedFormat(config, name, node, originalName, modifiers) {
            const formats = config.format;
            if (!(formats === null || formats === void 0 ? void 0 : formats.length)) {
                return true;
            }
            if (!modifiers.has(enums_1.Modifiers.requiresQuotes)) {
                for (const format of formats) {
                    const checker = format_1.PredefinedFormatToCheckFunction[format];
                    if (checker(name)) {
                        return true;
                    }
                }
            }
            context.report({
                node,
                messageId: originalName === name
                    ? 'doesNotMatchFormat'
                    : 'doesNotMatchFormatTrimmed',
                data: formatReportData({
                    originalName,
                    processedName: name,
                    formats,
                }),
            });
            return false;
        }