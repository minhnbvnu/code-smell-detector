function isEmitBlocked(emitFileName) {
                return hasEmitBlockingDiagnostics.has(toPath3(emitFileName));
            }