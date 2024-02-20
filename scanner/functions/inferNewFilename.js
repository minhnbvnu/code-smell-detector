function inferNewFilename(importsFromNewFile, movedSymbols) {
            return importsFromNewFile.forEachEntry(symbolNameNoDefault) || movedSymbols.forEachEntry(symbolNameNoDefault) || "newFile";
        }