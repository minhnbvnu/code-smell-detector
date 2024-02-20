function processProjectReferenceFile(fileName, reason) {
                return processSourceFile(fileName, 
                /*isDefaultLib*/
                false, 
                /*ignoreNoDefaultLib*/
                false, 
                /*packageId*/
                void 0, reason);
            }