function determineVersion(version) {
    return __awaiter(this, void 0, void 0, function* () {
        // A temporary hack to make these work
        if (version == "latest" || version == "4" || version == "4.x" || version == "4.x.x") {
            version = "release";
        }
        else if (version == "3" || version == "3.x" || version == "3.x.x") {
            version = "3.6.3";
        }
        else if (version.endsWith(".x")) {
            version = version.replace(/[.]x$/, "");
        }
        if (version.startsWith("oldrel-")) {
            version = version.replace(/^oldrel[-]/, "oldrel/");
        }
        let rest = new restm.RestClient("setup-r");
        let os = OS != "linux" ? OS : yield getLinuxPlatform();
        let url = "https://api.r-hub.io/rversions/resolve/" +
            version + "/" + os;
        if (ARCH) {
            url = url + "/" + ARCH;
        }
        let tags = (yield rest.get(url)).result;
        if (!tags) {
            throw new Error(`Failed to resolve R version ${version} at ${url}.`);
        }
        return tags;
    });
}