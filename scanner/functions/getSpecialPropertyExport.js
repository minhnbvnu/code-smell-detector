function getSpecialPropertyExport(node2, useLhsSymbol) {
                    let kind;
                    switch (getAssignmentDeclarationKind(node2)) {
                        case 1 /* ExportsProperty */:
                            kind = 0 /* Named */;
                            break;
                        case 2 /* ModuleExports */:
                            kind = 2 /* ExportEquals */;
                            break;
                        default:
                            return void 0;
                    }
                    const sym = useLhsSymbol ? checker.getSymbolAtLocation(getNameOfAccessExpression(cast(node2.left, isAccessExpression))) : symbol;
                    return sym && exportInfo(sym, kind);
                }