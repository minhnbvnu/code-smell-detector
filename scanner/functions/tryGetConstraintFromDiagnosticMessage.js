function tryGetConstraintFromDiagnosticMessage(messageText) {
            const [_, constraint] = flattenDiagnosticMessageText(messageText, "\n", 0).match(/`extends (.*)`/) || [];
            return constraint;
        }