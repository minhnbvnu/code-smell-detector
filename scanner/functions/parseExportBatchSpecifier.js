function parseExportBatchSpecifier() {
        var marker = markerCreate();
        expect('*');
        return markerApply(marker, delegate.createExportBatchSpecifier());
    }