function getImportMetaIfNecessary(sourceFile) {
            return sourceFile.flags & 4194304 /* PossiblyContainsImportMeta */ ? walkTreeForImportMeta(sourceFile) : void 0;
        }