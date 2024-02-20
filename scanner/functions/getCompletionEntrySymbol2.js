function getCompletionEntrySymbol2(fileName, position, name, source, preferences = emptyOptions) {
                synchronizeHostData();
                return ts_Completions_exports.getCompletionEntrySymbol(program, log, getValidSourceFile(fileName), position, { name, source }, host, preferences);
            }