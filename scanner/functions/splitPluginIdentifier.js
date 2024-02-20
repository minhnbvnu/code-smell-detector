function splitPluginIdentifier(identifier) {
        const parts = identifier.split("/");
        return {
            objectName: parts.pop(),
            pluginName: parts.join("/")
        };
    }