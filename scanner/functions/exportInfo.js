function exportInfo(symbol2, kind) {
                const exportInfo2 = getExportInfo(symbol2, kind, checker);
                return exportInfo2 && { kind: 1 /* Export */, symbol: symbol2, exportInfo: exportInfo2 };
            }