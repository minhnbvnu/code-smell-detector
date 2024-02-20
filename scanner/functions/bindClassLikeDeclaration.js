function bindClassLikeDeclaration(node) {
                if (node.kind === 260 /* ClassDeclaration */) {
                    bindBlockScopedDeclaration(node, 32 /* Class */, 899503 /* ClassExcludes */);
                }
                else {
                    const bindingName = node.name ? node.name.escapedText : "__class" /* Class */;
                    bindAnonymousDeclaration(node, 32 /* Class */, bindingName);
                    if (node.name) {
                        classifiableNames.add(node.name.escapedText);
                    }
                }
                const { symbol } = node;
                const prototypeSymbol = createSymbol(4 /* Property */ | 4194304 /* Prototype */, "prototype");
                const symbolExport = symbol.exports.get(prototypeSymbol.escapedName);
                if (symbolExport) {
                    if (node.name) {
                        setParent(node.name, node);
                    }
                    file.bindDiagnostics.push(createDiagnosticForNode2(symbolExport.declarations[0], Diagnostics.Duplicate_identifier_0, symbolName(prototypeSymbol)));
                }
                symbol.exports.set(prototypeSymbol.escapedName, prototypeSymbol);
                prototypeSymbol.parent = symbol;
            }