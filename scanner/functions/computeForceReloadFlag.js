function computeForceReloadFlag(url) {
    return useIDE && ! (fastReload && isBuiltIn(url));
}