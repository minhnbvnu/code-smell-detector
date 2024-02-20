function copyStringToPasteboard(context, string) {
    var pasteboard = NSPasteboard.generalPasteboard();
    pasteboard.clearContents();
    pasteboard.setString_forType(NSMutableString.stringWithString(string), NSPasteboardTypeString);
    context.document.showMessage("Layout setting copied.");
}