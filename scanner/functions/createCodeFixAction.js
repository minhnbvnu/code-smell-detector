function createCodeFixAction(fixName8, changes, description2, fixId51, fixAllDescription, command) {
            return createCodeFixActionWorker(fixName8, diagnosticToString(description2), changes, fixId51, diagnosticToString(fixAllDescription), command);
        }