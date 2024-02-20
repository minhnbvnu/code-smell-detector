function getCompletionEntryDetails2(fileName, position, name, formattingOptions, source, preferences = emptyOptions, data) {
                synchronizeHostData();
                return ts_Completions_exports.getCompletionEntryDetails(program, log, getValidSourceFile(fileName), position, { name, source, data }, host, formattingOptions && ts_formatting_exports.getFormatContext(formattingOptions, host), 
                // TODO: GH#18217
                preferences, cancellationToken);
            }