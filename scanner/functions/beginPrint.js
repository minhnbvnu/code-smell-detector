function beginPrint() {
                return ownWriter || (ownWriter = createTextWriter(newLine));
            }