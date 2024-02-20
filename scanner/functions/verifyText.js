function verifyText({ text, cwd, filePath: providedFilePath, configs, fix, allowInlineConfig, reportUnusedDisableDirectives, linter }) {
        const filePath = providedFilePath || "<text>";
        debug(`Lint ${filePath}`);
        /*
         * Verify.
         * `config.extractConfig(filePath)` requires an absolute path, but `linter`
         * doesn't know CWD, so it gives `linter` an absolute path always.
         */
        const filePathToVerify = filePath === "<text>" ? getPlaceholderPath(cwd) : filePath;
        const { fixed, messages, output } = linter.verifyAndFix(text, configs, {
            allowInlineConfig,
            filename: filePathToVerify,
            fix,
            reportUnusedDisableDirectives,
            /**
             * Check if the linter should adopt a given code block or not.
             * @param {string} blockFilename The virtual filename of a code block.
             * @returns {boolean} `true` if the linter should adopt the code block.
             */
            filterCodeBlock(blockFilename) {
                return configs.isExplicitMatch(blockFilename);
            }
        });
        // Tweak and return.
        const result = {
            filePath: filePath === "<text>" ? filePath : path.resolve(filePath),
            messages,
            suppressedMessages: linter.getSuppressedMessages(),
            ...calculateStatsPerFile(messages)
        };
        if (fixed) {
            result.output = output;
        }
        if (result.errorCount + result.warningCount > 0 &&
            typeof result.output === "undefined") {
            result.source = text;
        }
        return result;
    }