function getErrorSummaryText(errorCount, filesInError, newLine, host) {
            if (errorCount === 0)
                return "";
            const nonNilFiles = filesInError.filter((fileInError) => fileInError !== void 0);
            const distinctFileNamesWithLines = nonNilFiles.map((fileInError) => `${fileInError.fileName}:${fileInError.line}`).filter((value, index, self) => self.indexOf(value) === index);
            const firstFileReference = nonNilFiles[0] && prettyPathForFileError(nonNilFiles[0], host.getCurrentDirectory());
            const d = errorCount === 1 ? createCompilerDiagnostic(filesInError[0] !== void 0 ? Diagnostics.Found_1_error_in_1 : Diagnostics.Found_1_error, errorCount, firstFileReference) : createCompilerDiagnostic(distinctFileNamesWithLines.length === 0 ? Diagnostics.Found_0_errors : distinctFileNamesWithLines.length === 1 ? Diagnostics.Found_0_errors_in_the_same_file_starting_at_Colon_1 : Diagnostics.Found_0_errors_in_1_files, errorCount, distinctFileNamesWithLines.length === 1 ? firstFileReference : distinctFileNamesWithLines.length);
            const suffix = distinctFileNamesWithLines.length > 1 ? createTabularErrorsDisplay(nonNilFiles, host) : "";
            return `${newLine}${flattenDiagnosticMessageText(d.messageText, newLine)}${newLine}${newLine}${suffix}`;
        }