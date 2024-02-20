function endPrint() {
                const text = ownWriter.getText();
                ownWriter.clear();
                return text;
            }