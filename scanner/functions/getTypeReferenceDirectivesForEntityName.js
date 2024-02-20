function getTypeReferenceDirectivesForEntityName(node) {
                    if (!fileToDirective) {
                        return void 0;
                    }
                    let meaning;
                    if (node.parent.kind === 164 /* ComputedPropertyName */) {
                        meaning = 111551 /* Value */ | 1048576 /* ExportValue */;
                    }
                    else {
                        meaning = 788968 /* Type */ | 1920 /* Namespace */;
                        if (node.kind === 79 /* Identifier */ && isInTypeQuery(node) || node.kind === 208 /* PropertyAccessExpression */ && !isInHeritageClause(node)) {
                            meaning = 111551 /* Value */ | 1048576 /* ExportValue */;
                        }
                    }
                    const symbol = resolveEntityName(node, meaning, 
                    /*ignoreErrors*/
                    true);
                    return symbol && symbol !== unknownSymbol ? getTypeReferenceDirectivesForSymbol(symbol, meaning) : void 0;
                }