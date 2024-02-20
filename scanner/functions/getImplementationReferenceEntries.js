function getImplementationReferenceEntries(program, cancellationToken, sourceFiles, node, position) {
            if (node.kind === 308 /* SourceFile */) {
                return void 0;
            }
            const checker = program.getTypeChecker();
            if (node.parent.kind === 300 /* ShorthandPropertyAssignment */) {
                const result = [];
                Core.getReferenceEntriesForShorthandPropertyAssignment(node, checker, (node2) => result.push(nodeEntry(node2)));
                return result;
            }
            else if (node.kind === 106 /* SuperKeyword */ || isSuperProperty(node.parent)) {
                const symbol = checker.getSymbolAtLocation(node);
                return symbol.valueDeclaration && [nodeEntry(symbol.valueDeclaration)];
            }
            else {
                return getReferenceEntriesForNode(position, node, program, sourceFiles, cancellationToken, { implementations: true, use: 1 /* References */ });
            }
        }