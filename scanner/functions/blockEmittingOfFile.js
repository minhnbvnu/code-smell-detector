function blockEmittingOfFile(emitFileName, diag2) {
                hasEmitBlockingDiagnostics.set(toPath3(emitFileName), true);
                programDiagnostics.add(diag2);
            }