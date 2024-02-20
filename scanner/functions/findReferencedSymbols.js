function findReferencedSymbols(program, cancellationToken, sourceFiles, sourceFile, position) {
            const node = getTouchingPropertyName(sourceFile, position);
            const options = { use: 1 /* References */ };
            const referencedSymbols = Core.getReferencedSymbolsForNode(position, node, program, sourceFiles, cancellationToken, options);
            const checker = program.getTypeChecker();
            const adjustedNode = Core.getAdjustedNode(node, options);
            const symbol = isDefinitionForReference(adjustedNode) ? checker.getSymbolAtLocation(adjustedNode) : void 0;
            return !referencedSymbols || !referencedSymbols.length ? void 0 : mapDefined(referencedSymbols, ({ definition, references }) => (
            // Only include referenced symbols that have a valid definition.
            definition && {
                definition: checker.runWithCancellationToken(cancellationToken, (checker2) => definitionToReferencedSymbolDefinitionInfo(definition, checker2, node)),
                references: references.map((r) => toReferencedSymbolEntry(r, symbol))
            }));
        }