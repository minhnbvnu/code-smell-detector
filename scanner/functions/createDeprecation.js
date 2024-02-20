function createDeprecation(name, options = {}) {
            var _a2, _b;
            const version2 = typeof options.typeScriptVersion === "string" ? new Version(options.typeScriptVersion) : (_a2 = options.typeScriptVersion) != null ? _a2 : getTypeScriptVersion();
            const errorAfter = typeof options.errorAfter === "string" ? new Version(options.errorAfter) : options.errorAfter;
            const warnAfter = typeof options.warnAfter === "string" ? new Version(options.warnAfter) : options.warnAfter;
            const since = typeof options.since === "string" ? new Version(options.since) : (_b = options.since) != null ? _b : warnAfter;
            const error = options.error || errorAfter && version2.compareTo(errorAfter) >= 0;
            const warn = !warnAfter || version2.compareTo(warnAfter) >= 0;
            return error ? createErrorDeprecation(name, errorAfter, since, options.message) : warn ? createWarningDeprecation(name, errorAfter, since, options.message) : noop;
        }