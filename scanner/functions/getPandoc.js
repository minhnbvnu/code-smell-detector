function getPandoc(version) {
    if (IS_WINDOWS) {
        return installPandocWindows(version);
    }
    else if (IS_MAC) {
        return installPandocMac(version);
    }
    else {
        return installPandocLinux(version);
    }
}