function getStringFromPasteboard(context) {
    var pasteboard = NSPasteboard.generalPasteboard();
    var pasteboardItems = pasteboard.pasteboardItems();
    if (pasteboardItems.count() > 0) {
        var string = pasteboardItems.firstObject().stringForType(NSPasteboardTypeString);
        if (string) {
            return string;
        } else {
            context.document.showMessage("No layout setting in clipboard.");
            return nil;
        }
    }
}