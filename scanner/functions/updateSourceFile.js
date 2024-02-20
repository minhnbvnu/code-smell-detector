function updateSourceFile(sourceFile, newText, textChangeRange, aggressiveChecks = false) {
            const newSourceFile = IncrementalParser.updateSourceFile(sourceFile, newText, textChangeRange, aggressiveChecks);
            newSourceFile.flags |= sourceFile.flags & 6291456 /* PermanentlySetIncrementalFlags */;
            return newSourceFile;
        }