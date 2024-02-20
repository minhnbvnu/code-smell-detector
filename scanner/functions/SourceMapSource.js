function SourceMapSource(fileName, text, skipTrivia2) {
            this.fileName = fileName;
            this.text = text;
            this.skipTrivia = skipTrivia2 || ((pos) => pos);
        }