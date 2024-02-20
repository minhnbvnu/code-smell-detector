function getSyntacticDiagnostics(fileName) {
                synchronizeHostData();
                return program.getSyntacticDiagnostics(getValidSourceFile(fileName), cancellationToken).slice();
            }