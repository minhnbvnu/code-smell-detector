function formatDiagnostic(diagnostic, host) {
            const errorMessage = `${diagnosticCategoryName(diagnostic)} TS${diagnostic.code}: ${flattenDiagnosticMessageText(diagnostic.messageText, host.getNewLine())}${host.getNewLine()}`;
            if (diagnostic.file) {
                const { line, character } = getLineAndCharacterOfPosition(diagnostic.file, diagnostic.start);
                const fileName = diagnostic.file.fileName;
                const relativeFileName = convertToRelativePath(fileName, host.getCurrentDirectory(), (fileName2) => host.getCanonicalFileName(fileName2));
                return `${relativeFileName}(${line + 1},${character + 1}): ` + errorMessage;
            }
            return errorMessage;
        }