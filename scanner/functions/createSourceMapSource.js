function createSourceMapSource(fileName, text, skipTrivia2) {
            return new (SourceMapSource2 || (SourceMapSource2 = objectAllocator.getSourceMapSourceConstructor()))(fileName, text, skipTrivia2);
        }