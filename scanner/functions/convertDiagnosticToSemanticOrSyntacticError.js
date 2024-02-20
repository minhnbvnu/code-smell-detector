function convertDiagnosticToSemanticOrSyntacticError(diagnostic) {
        return Object.assign(Object.assign({}, diagnostic), { message: (0, typescript_1.flattenDiagnosticMessageText)(diagnostic.messageText, typescript_1.sys.newLine) });
    }