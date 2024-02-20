function sliceSetting(context) {

    var preferences = require("../modules/Preferences");
    var Dialog = require("../modules/Dialog").dialog;
    var ui = require("../modules/Dialog").ui;

    // Dialog
    var dialog = new Dialog(
        "Slice Setting",
        "Fast slice add a slice with an export preset and name to url-friendly format. " +
        "Slice name will change Latin char to ASCII char, remove not ASCII char, " +
        "special sign and digits at the beginning of name.",
        300,
        ["Save", "Cancel"]
    );

    var presetLabel = ui.textLabel("Choose Export Option Preset for Slice Layer");
    dialog.addView(presetLabel);

    var exportPresets = MSExportPreset.allExportPresets().slice().map(function(item) {
        return item.name()
    });
    var preset = ui.popupButton(exportPresets, 300);
    dialog.addView(preset);

    var nameLabel = ui.textLabel("Choose Slice Layer Name Format");
    dialog.addView(nameLabel);

    var nameFormats = [
        "group/base_name",
        "group/base-name",
        "group_base_name",
        "group-base-name",
        "base_name",
        "base-name"
    ];
    var nameFormat = ui.popupButton(nameFormats, 300);
    dialog.addView(nameFormat);

    var sliceExportPresetIndex = preferences.get("sliceExportPresetIndex");
    var sliceExportPresetName = preferences.get("sliceExportPresetName");
    var sliceNameFormat = preferences.get("sliceNameFormat");
    if (sliceExportPresetIndex && sliceExportPresetName) {
        if (exportPresets[sliceExportPresetIndex] == sliceExportPresetName) {
            preset.selectItemAtIndex(sliceExportPresetIndex);
        }
    }
    if (sliceNameFormat) {
        nameFormat.selectItemAtIndex(sliceNameFormat);
    }

    var layerOrderLabel = ui.textLabel("Order of New Slice Layer");
    dialog.addView(layerOrderLabel);
    var sliceOrder = ui.popupButton(["Bottom, inside a group. (default)", "Top, inside a group.", "Top of layer list."]);
    dialog.addView(sliceOrder);
    sliceOrder.selectItemAtIndex(parseInt(preferences.get("sliceLayerOrder")) || 0);

    var responseCode = dialog.run();
    if (responseCode == 1000) {
        // Save preferences
        preferences.set("sliceExportPresetIndex", preset.indexOfSelectedItem());
        preferences.set("sliceExportPresetName", preset.titleOfSelectedItem());
        preferences.set("sliceNameFormat", nameFormat.indexOfSelectedItem());
        preferences.set("sliceLayerOrder", sliceOrder.indexOfSelectedItem());
    }

    return responseCode;
}