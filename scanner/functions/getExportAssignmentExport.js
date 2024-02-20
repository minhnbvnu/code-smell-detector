function getExportAssignmentExport(ex) {
                    if (!ex.symbol.parent)
                        return void 0;
                    const exportKind = ex.isExportEquals ? 2 /* ExportEquals */ : 1 /* Default */;
                    return { kind: 1 /* Export */, symbol, exportInfo: { exportingModuleSymbol: ex.symbol.parent, exportKind } };
                }