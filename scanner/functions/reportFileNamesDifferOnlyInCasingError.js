function reportFileNamesDifferOnlyInCasingError(fileName, existingFile, reason) {
                const hasExistingReasonToReportErrorOn = !isReferencedFile(reason) && some(fileReasons.get(existingFile.path), isReferencedFile);
                if (hasExistingReasonToReportErrorOn) {
                    addFilePreprocessingFileExplainingDiagnostic(existingFile, reason, Diagnostics.Already_included_file_name_0_differs_from_file_name_1_only_in_casing, [existingFile.fileName, fileName]);
                }
                else {
                    addFilePreprocessingFileExplainingDiagnostic(existingFile, reason, Diagnostics.File_name_0_differs_from_already_included_file_name_1_only_in_casing, [fileName, existingFile.fileName]);
                }
            }