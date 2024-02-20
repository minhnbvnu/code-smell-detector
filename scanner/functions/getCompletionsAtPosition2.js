function getCompletionsAtPosition2(fileName, position, options = emptyOptions, formattingSettings) {
                const fullPreferences = {
                    ...identity(options),
                    // avoid excess property check
                    includeCompletionsForModuleExports: options.includeCompletionsForModuleExports || options.includeExternalModuleExports,
                    includeCompletionsWithInsertText: options.includeCompletionsWithInsertText || options.includeInsertTextCompletions
                };
                synchronizeHostData();
                return ts_Completions_exports.getCompletionsAtPosition(host, program, log, getValidSourceFile(fileName), position, fullPreferences, options.triggerCharacter, options.triggerKind, cancellationToken, formattingSettings && ts_formatting_exports.getFormatContext(formattingSettings, host), options.includeSymbol);
            }