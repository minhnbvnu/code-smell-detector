function getReferenceEntriesForNode(position, node, program, sourceFiles, cancellationToken, options = {}, sourceFilesSet = new Set(sourceFiles.map((f) => f.fileName))) {
            return flattenEntries(Core.getReferencedSymbolsForNode(position, node, program, sourceFiles, cancellationToken, options, sourceFilesSet));
        }