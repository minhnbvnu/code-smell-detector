function groupIsSafeToUngroup(group) {
    var noOpacity = (group.style().contextSettings().opacity() == 1),
        noBlending = (group.style().hasBlending() == 0),
        noShadows = (group.style().hasEnabledShadow() == 0),
        noExportOptions = (group.exportOptions().exportFormats().count() == 0);
    // Sketch 44+ resizing constraint
    if (sketch.version.sketch >= 44) {
        var noResizingConstraint = (group.resizingConstraint() == 63);
        // Tint in ground
        if (sketch.version.sketch >= 64) {
            var noTint = (group.style().fills().count() == 0 || group.style().fills().firstObject().isEnabled() == false);
            return noOpacity && noBlending && noShadows && noResizingConstraint && noExportOptions && noTint;
        }
        return noOpacity && noBlending && noShadows && noResizingConstraint && noExportOptions;
    } else {
        var noResizing = (group.resizingType() == 0);
        return noOpacity && noBlending && noShadows && noResizing && noExportOptions;
    }
}