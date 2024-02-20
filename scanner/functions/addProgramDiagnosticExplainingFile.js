function addProgramDiagnosticExplainingFile(file, diagnostic, args) {
                programDiagnostics.add(createDiagnosticExplainingFile(file, 
                /*fileProcessingReason*/
                void 0, diagnostic, args));
            }