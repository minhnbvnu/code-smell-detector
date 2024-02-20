function formatDiagnosticsWithColorAndContext(diagnostics, host) {
            let output = "";
            for (const diagnostic of diagnostics) {
                if (diagnostic.file) {
                    const { file, start } = diagnostic;
                    output += formatLocation(file, start, host);
                    output += " - ";
                }
                output += formatColorAndReset(diagnosticCategoryName(diagnostic), getCategoryFormat(diagnostic.category));
                output += formatColorAndReset(` TS${diagnostic.code}: `, "\x1B[90m" /* Grey */);
                output += flattenDiagnosticMessageText(diagnostic.messageText, host.getNewLine());
                if (diagnostic.file) {
                    output += host.getNewLine();
                    output += formatCodeSpan(diagnostic.file, diagnostic.start, diagnostic.length, "", getCategoryFormat(diagnostic.category), host);
                }
                if (diagnostic.relatedInformation) {
                    output += host.getNewLine();
                    for (const { file, start, length: length2, messageText } of diagnostic.relatedInformation) {
                        if (file) {
                            output += host.getNewLine();
                            output += halfIndent + formatLocation(file, start, host);
                            output += formatCodeSpan(file, start, length2, indent, "\x1B[96m" /* Cyan */, host);
                        }
                        output += host.getNewLine();
                        output += indent + flattenDiagnosticMessageText(messageText, host.getNewLine());
                    }
                }
                output += host.getNewLine();
            }
            return output;
        }