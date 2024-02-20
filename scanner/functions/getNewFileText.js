function getNewFileText(statements, scriptKind, newLineCharacter, formatContext) {
            return changesToText.newFileChangesWorker(
            /*oldFile*/
            void 0, scriptKind, statements, newLineCharacter, formatContext);
        }