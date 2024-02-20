function getSmartSelectionRange2(fileName, position) {
                return ts_SmartSelectionRange_exports.getSmartSelectionRange(position, syntaxTreeCache.getCurrentSourceFile(fileName));
            }