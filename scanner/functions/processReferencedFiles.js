function processReferencedFiles(file, isDefaultLib) {
                forEach(file.referencedFiles, (ref, index) => {
                    processSourceFile(resolveTripleslashReference(ref.fileName, file.fileName), isDefaultLib, 
                    /*ignoreNoDefaultLib*/
                    false, 
                    /*packageId*/
                    void 0, { kind: 4 /* ReferenceFile */, file: file.path, index });
                });
            }