function tryReadFile(fileName, readFile) {
            let text;
            try {
                text = readFile(fileName);
            }
            catch (e) {
                return createCompilerDiagnostic(Diagnostics.Cannot_read_file_0_Colon_1, fileName, e.message);
            }
            return text === void 0 ? createCompilerDiagnostic(Diagnostics.Cannot_read_file_0, fileName) : text;
        }