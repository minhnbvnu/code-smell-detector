function getFileReference() {
                const fileName = scanner.getTokenValue();
                const pos = scanner.getTokenPos();
                return { fileName, pos, end: pos + fileName.length };
            }