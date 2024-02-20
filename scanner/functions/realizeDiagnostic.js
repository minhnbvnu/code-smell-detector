function realizeDiagnostic(diagnostic, newLine) {
            return {
                message: flattenDiagnosticMessageText(diagnostic.messageText, newLine),
                start: diagnostic.start,
                // TODO: GH#18217
                length: diagnostic.length,
                // TODO: GH#18217
                category: diagnosticCategoryName(diagnostic),
                code: diagnostic.code,
                reportsUnnecessary: diagnostic.reportsUnnecessary,
                reportsDeprecated: diagnostic.reportsDeprecated
            };
        }