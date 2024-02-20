function exportPresetFromJsObject(jsObject) {
    var exportFormats = NSMutableArray.alloc().init();
    jsObject.exportFormats.forEach(function(format) {
        var exportFormat = MSExportFormat.alloc().init();
        exportFormat.setAbsoluteSize(format["absoluteSize"]);
        exportFormat.setFileFormat(format["fileFormat"]);
        exportFormat.setName(format["name"]);
        exportFormat.setNamingScheme(format["namingScheme"]);
        exportFormat.setScale(format["scale"]);
        exportFormat.setVisibleScaleType(format["visibleScaleType"]);
        exportFormats.addObject(exportFormat);
    });
    var exportPreset = MSExportPreset.alloc().initWithName_formats(jsObject["name"], exportFormats);
    exportPreset.setShouldApplyAutomatically(jsObject["shouldApplyAutomatically"]);
    return exportPreset;
}