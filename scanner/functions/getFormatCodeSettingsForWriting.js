function getFormatCodeSettingsForWriting({ options }, sourceFile) {
            const shouldAutoDetectSemicolonPreference = !options.semicolons || options.semicolons === "ignore" /* Ignore */;
            const shouldRemoveSemicolons = options.semicolons === "remove" /* Remove */ || shouldAutoDetectSemicolonPreference && !probablyUsesSemicolons(sourceFile);
            return {
                ...options,
                semicolons: shouldRemoveSemicolons ? "remove" /* Remove */ : "ignore" /* Ignore */
            };
        }