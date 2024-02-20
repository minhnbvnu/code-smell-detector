function getWatchErrorSummaryDiagnosticMessage(errorCount) {
            return errorCount === 1 ? Diagnostics.Found_1_error_Watching_for_file_changes : Diagnostics.Found_0_errors_Watching_for_file_changes;
        }