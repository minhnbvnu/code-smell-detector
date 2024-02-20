function processRootFile(fileName, isDefaultLib, ignoreNoDefaultLib, reason) {
                processSourceFile(normalizePath(fileName), isDefaultLib, ignoreNoDefaultLib, 
                /*packageId*/
                void 0, reason);
            }