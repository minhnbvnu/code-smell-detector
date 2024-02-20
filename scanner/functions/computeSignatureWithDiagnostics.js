function computeSignatureWithDiagnostics(program, sourceFile, text, host, data) {
            var _a2, _b;
            text = getTextHandlingSourceMapForSignature(text, data);
            let sourceFileDirectory;
            if ((_a2 = data == null ? void 0 : data.diagnostics) == null ? void 0 : _a2.length) {
                text += data.diagnostics.map((diagnostic) => `${locationInfo(diagnostic)}${DiagnosticCategory[diagnostic.category]}${diagnostic.code}: ${flattenDiagnosticMessageText2(diagnostic.messageText)}`).join("\n");
            }
            return ((_b = host.createHash) != null ? _b : generateDjb2Hash)(text);
            function flattenDiagnosticMessageText2(diagnostic) {
                return isString(diagnostic) ? diagnostic : diagnostic === void 0 ? "" : !diagnostic.next ? diagnostic.messageText : diagnostic.messageText + diagnostic.next.map(flattenDiagnosticMessageText2).join("\n");
            }
            function locationInfo(diagnostic) {
                if (diagnostic.file.resolvedPath === sourceFile.resolvedPath)
                    return `(${diagnostic.start},${diagnostic.length})`;
                if (sourceFileDirectory === void 0)
                    sourceFileDirectory = getDirectoryPath(sourceFile.resolvedPath);
                return `${ensurePathIsNonModuleName(getRelativePathFromDirectory(sourceFileDirectory, diagnostic.file.resolvedPath, program.getCanonicalFileName))}(${diagnostic.start},${diagnostic.length})`;
            }
        }