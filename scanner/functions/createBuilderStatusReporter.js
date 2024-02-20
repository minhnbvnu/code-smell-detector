function createBuilderStatusReporter(system, pretty) {
            return (diagnostic) => {
                let output = pretty ? `[${formatColorAndReset(getLocaleTimeString(system), "\x1B[90m" /* Grey */)}] ` : `${getLocaleTimeString(system)} - `;
                output += `${flattenDiagnosticMessageText(diagnostic.messageText, system.newLine)}${system.newLine + system.newLine}`;
                system.write(output);
            };
        }