function usingSingleLineStringWriter(action) {
            const oldString = stringWriter.getText();
            try {
                action(stringWriter);
                return stringWriter.getText();
            }
            finally {
                stringWriter.clear();
                stringWriter.writeKeyword(oldString);
            }
        }