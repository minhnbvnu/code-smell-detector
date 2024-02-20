function openUrlInBrowser(url) {
    NSWorkspace.sharedWorkspace().openURL(NSURL.URLWithString(url));
}