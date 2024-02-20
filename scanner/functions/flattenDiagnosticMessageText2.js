function flattenDiagnosticMessageText2(diagnostic) {
                return isString(diagnostic) ? diagnostic : diagnostic === void 0 ? "" : !diagnostic.next ? diagnostic.messageText : diagnostic.messageText + diagnostic.next.map(flattenDiagnosticMessageText2).join("\n");
            }