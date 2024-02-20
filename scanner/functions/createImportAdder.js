function createImportAdder(sourceFile, program, preferences, host, cancellationToken) {
            return createImportAdderWorker(sourceFile, program, 
            /*useAutoImportProvider*/
            false, preferences, host, cancellationToken);
        }