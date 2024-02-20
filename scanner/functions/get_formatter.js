function get_formatter(raw_spec, format, formatters) {
        // no format, use default built in formatter
        if (format == null)
            return basic_formatter;
        // format spec in the formatters dict, use that
        if (formatters != null && raw_spec in formatters) {
            const formatter = formatters[raw_spec];
            if ((0, types_1.isString)(formatter)) {
                if (formatter in exports.DEFAULT_FORMATTERS)
                    return exports.DEFAULT_FORMATTERS[formatter];
                else
                    throw new Error(`Unknown tooltip field formatter type '${formatter}'`);
            }
            return function (value, format, special_vars) {
                return formatter.format(value, format, special_vars);
            };
        }
        // otherwise use "numeral" as default
        return exports.DEFAULT_FORMATTERS.numeral;
    }