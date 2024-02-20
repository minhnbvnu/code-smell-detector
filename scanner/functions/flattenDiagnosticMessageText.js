function flattenDiagnosticMessageText(diag2, newLine, indent2 = 0) {
            if (isString(diag2)) {
                return diag2;
            }
            else if (diag2 === void 0) {
                return "";
            }
            let result = "";
            if (indent2) {
                result += newLine;
                for (let i = 0; i < indent2; i++) {
                    result += "  ";
                }
            }
            result += diag2.messageText;
            indent2++;
            if (diag2.next) {
                for (const kid of diag2.next) {
                    result += flattenDiagnosticMessageText(kid, newLine, indent2);
                }
            }
            return result;
        }