function ShaderError(fileNumber, lineNumber, message) {
            this.file = fileNumber;
            this.line = lineNumber;
            this.message = message;
        }