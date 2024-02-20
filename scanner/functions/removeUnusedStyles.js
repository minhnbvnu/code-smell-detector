function removeUnusedStyles(context, layer) {
    var document = context.document;
    layer.select_byExtendingSelection(true, false);
    if (layer.isKindOfClass(MSStyledLayer)) {
        NSApp.sendAction_to_from_("removeUnusedStyles:", nil, document);
    }
    layer.select_byExtendingSelection(false, false);
}