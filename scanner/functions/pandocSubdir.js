function pandocSubdir(version) {
    if ((0, compare_versions_1.compare)(version, "2.9.2", ">=")) {
        return util.format("pandoc-%s", version);
    }
    if ((0, compare_versions_1.compare)(version, "2.9.1", "=")) {
        return "";
    }
    return util.format("pandoc-%s-windows-x86_64", version);
}