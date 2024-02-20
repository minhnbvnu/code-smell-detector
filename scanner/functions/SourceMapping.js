function SourceMapping() {
            this.start = new SourceMapPosition();
            this.end = new SourceMapPosition();
            this.nameIndex = -1;
            this.childMappings = [];
        }