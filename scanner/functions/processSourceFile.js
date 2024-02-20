function processSourceFile(fileName, isDefaultLib, ignoreNoDefaultLib, packageId, reason) {
                getSourceFileFromReferenceWorker(fileName, (fileName2) => findSourceFile(fileName2, isDefaultLib, ignoreNoDefaultLib, reason, packageId), 
                // TODO: GH#18217
                (diagnostic, ...args) => addFilePreprocessingFileExplainingDiagnostic(
                /*file*/
                void 0, reason, diagnostic, args), reason);
            }