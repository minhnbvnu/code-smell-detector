function getEditsForFileRename2(oldFilePath, newFilePath, formatOptions, preferences = emptyOptions) {
                return getEditsForFileRename(getProgram(), oldFilePath, newFilePath, host, ts_formatting_exports.getFormatContext(formatOptions, host), preferences, sourceMapper);
            }