function getFilesInErrorForSummary(diagnostics) {
            const filesInError = filter(diagnostics, (diagnostic) => diagnostic.category === 1 /* Error */).map((errorDiagnostic) => {
                if (errorDiagnostic.file === void 0)
                    return;
                return `${errorDiagnostic.file.fileName}`;
            });
            return filesInError.map((fileName) => {
                if (fileName === void 0) {
                    return void 0;
                }
                const diagnosticForFileName = find(diagnostics, (diagnostic) => diagnostic.file !== void 0 && diagnostic.file.fileName === fileName);
                if (diagnosticForFileName !== void 0) {
                    const { line } = getLineAndCharacterOfPosition(diagnosticForFileName.file, diagnosticForFileName.start);
                    return {
                        fileName,
                        line: line + 1
                    };
                }
            });
        }