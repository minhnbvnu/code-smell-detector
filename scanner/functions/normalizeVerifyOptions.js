function normalizeVerifyOptions(providedOptions, config) {
        const linterOptions = config.linterOptions || config;
        // .noInlineConfig for eslintrc, .linterOptions.noInlineConfig for flat
        const disableInlineConfig = linterOptions.noInlineConfig === true;
        const ignoreInlineConfig = providedOptions.allowInlineConfig === false;
        const configNameOfNoInlineConfig = config.configNameOfNoInlineConfig
            ? ` (${config.configNameOfNoInlineConfig})`
            : "";
        let reportUnusedDisableDirectives = providedOptions.reportUnusedDisableDirectives;
        if (typeof reportUnusedDisableDirectives === "boolean") {
            reportUnusedDisableDirectives = reportUnusedDisableDirectives ? "error" : "off";
        }
        if (typeof reportUnusedDisableDirectives !== "string") {
            reportUnusedDisableDirectives =
                linterOptions.reportUnusedDisableDirectives
                    ? "warn" : "off";
        }
        return {
            filename: normalizeFilename(providedOptions.filename || "<input>"),
            allowInlineConfig: !ignoreInlineConfig,
            warnInlineConfig: disableInlineConfig && !ignoreInlineConfig
                ? `your config${configNameOfNoInlineConfig}`
                : null,
            reportUnusedDisableDirectives,
            disableFixes: Boolean(providedOptions.disableFixes)
        };
    }