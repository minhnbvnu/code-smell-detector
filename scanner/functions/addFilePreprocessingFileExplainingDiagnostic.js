function addFilePreprocessingFileExplainingDiagnostic(file, fileProcessingReason, diagnostic, args) {
                (fileProcessingDiagnostics || (fileProcessingDiagnostics = [])).push({
                    kind: 1 /* FilePreprocessingFileExplainingDiagnostic */,
                    file: file && file.path,
                    fileProcessingReason,
                    diagnostic,
                    args
                });
            }