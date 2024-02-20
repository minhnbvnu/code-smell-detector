function explainFiles(program, write) {
            var _a2, _b;
            const reasons = program.getFileIncludeReasons();
            const relativeFileName = (fileName) => convertToRelativePath(fileName, program.getCurrentDirectory(), program.getCanonicalFileName);
            for (const file of program.getSourceFiles()) {
                write(`${toFileName(file, relativeFileName)}`);
                (_a2 = reasons.get(file.path)) == null ? void 0 : _a2.forEach((reason) => write(`  ${fileIncludeReasonToDiagnostics(program, reason, relativeFileName).messageText}`));
                (_b = explainIfFileIsRedirectAndImpliedFormat(file, relativeFileName)) == null ? void 0 : _b.forEach((d) => write(`  ${d.messageText}`));
            }
        }