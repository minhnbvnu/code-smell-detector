function exportLayer(document, layer, destFolder, nameFormat, preset) {
    preset.exportFormats().forEach(function(exportFormat) {
        var exportRequest = MSExportRequest.exportRequestFromLayerAncestry_exportFormat_inRect(
            layer.ancestry(),
            exportFormat,
            layer.absoluteInfluenceRect()
        );
        var filePath = "";
        if (nameFormat == 1) {
            filePath += nameParts(layer.name()).map(formatNameUnderLine).join("_");
        } else if (nameFormat == 2) {
            filePath += nameParts(layer.name()).map(formatNameDash).join("-");
        } else if (nameFormat == 3) {
            filePath = formatNameUnderLine(nameParts(layer.name()).pop());
        } else if (nameFormat == 4) {
            filePath = formatNameDash(nameParts(layer.name()).pop());
        } else {
            filePath += layer.name();
        }
        if (exportFormat.namingScheme() == 0) {
            filePath += exportFormat.name();
        } else {
            filePath = exportFormat.name() + filePath;
        }
        filePath = destFolder + "/" + filePath + "." + exportRequest.format();
        document.saveExportRequest_toFile(exportRequest, filePath);
    });
}