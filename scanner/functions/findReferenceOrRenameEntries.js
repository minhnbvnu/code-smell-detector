function findReferenceOrRenameEntries(program, cancellationToken, sourceFiles, node, position, options, convertEntry) {
            return map(flattenEntries(Core.getReferencedSymbolsForNode(position, node, program, sourceFiles, cancellationToken, options)), (entry) => convertEntry(entry, node, program.getTypeChecker()));
        }