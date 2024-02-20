function toPlatformPath(pth) {
    return pth.replace(/[/\\]/g, path.sep);
}