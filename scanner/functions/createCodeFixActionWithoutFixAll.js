function createCodeFixActionWithoutFixAll(fixName8, changes, description2) {
            return createCodeFixActionWorker(fixName8, diagnosticToString(description2), changes, 
            /*fixId*/
            void 0, 
            /*fixAllDescription*/
            void 0);
        }