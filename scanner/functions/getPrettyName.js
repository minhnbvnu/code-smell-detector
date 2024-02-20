function getPrettyName(modPath, quote, treatAsFileName) {
        if (typeof quote === "undefined") { quote = true; }
        if (typeof treatAsFileName === "undefined") { treatAsFileName = false; }
        var modName = treatAsFileName ? switchToForwardSlashes(modPath) : trimModName(stripQuotes(modPath));
        var components = this.getPathComponents(modName);
        return components.length ? (quote ? quoteStr(components[components.length - 1]) : components[components.length - 1]) : modPath;
    }