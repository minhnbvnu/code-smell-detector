function createWatchStatusReporter(system, pretty) {
            return pretty ? (diagnostic, newLine, options) => {
                clearScreenIfNotWatchingForFileChanges(system, diagnostic, options);
                let output = `[${formatColorAndReset(getLocaleTimeString(system), "\x1B[90m" /* Grey */)}] `;
                output += `${flattenDiagnosticMessageText(diagnostic.messageText, system.newLine)}${newLine + newLine}`;
                system.write(output);
            } : (diagnostic, newLine, options) => {
                let output = "";
                if (!clearScreenIfNotWatchingForFileChanges(system, diagnostic, options)) {
                    output += newLine;
                }
                output += `${getLocaleTimeString(system)} - `;
                output += `${flattenDiagnosticMessageText(diagnostic.messageText, system.newLine)}${getPlainDiagnosticFollowingNewLines(diagnostic, newLine)}`;
                system.write(output);
            };
        }