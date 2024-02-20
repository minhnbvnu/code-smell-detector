function mapToDisplayParts(writeDisplayParts) {
            try {
                writeDisplayParts(displayPartWriter);
                return displayPartWriter.displayParts();
            }
            finally {
                displayPartWriter.clear();
            }
        }