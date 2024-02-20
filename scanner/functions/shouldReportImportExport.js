function shouldReportImportExport(node, previousNodes) {
        let i = 0;
        while (i < previousNodes.length) {
            if (isImportExportCanBeMerged(node, previousNodes[i])) {
                return true;
            }
            i++;
        }
        return false;
    }