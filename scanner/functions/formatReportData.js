function formatReportData({ affixes, formats, originalName, processedName, position, custom, count, }) {
            var _a;
            return {
                type: (0, shared_1.selectorTypeToMessageString)(type),
                name: originalName,
                processedName,
                position,
                count,
                affixes: affixes === null || affixes === void 0 ? void 0 : affixes.join(', '),
                formats: formats === null || formats === void 0 ? void 0 : formats.map(f => enums_1.PredefinedFormats[f]).join(', '),
                regex: (_a = custom === null || custom === void 0 ? void 0 : custom.regex) === null || _a === void 0 ? void 0 : _a.toString(),
                regexMatch: (custom === null || custom === void 0 ? void 0 : custom.match) === true
                    ? 'match'
                    : (custom === null || custom === void 0 ? void 0 : custom.match) === false
                        ? 'not match'
                        : null,
            };
        }