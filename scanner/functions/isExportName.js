function isExportName(node) {
            return (getEmitFlags(node) & 16384 /* ExportName */) !== 0;
        }