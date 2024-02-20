function getRelativePathToFixedPath(fixedModFilePath, absoluteModPath) {
        absoluteModPath = switchToForwardSlashes(absoluteModPath);
        var modComponents = this.getPathComponents(absoluteModPath);
        var fixedModComponents = this.getPathComponents(fixedModFilePath);
        var joinStartIndex = 0;
        for(; joinStartIndex < modComponents.length && joinStartIndex < fixedModComponents.length; joinStartIndex++) {
            if(fixedModComponents[joinStartIndex] != modComponents[joinStartIndex]) {
                break;
            }
        }
        if(joinStartIndex != 0) {
            var relativePath = "";
            var relativePathComponents = modComponents.slice(joinStartIndex, modComponents.length);
            for(; joinStartIndex < fixedModComponents.length; joinStartIndex++) {
                if(fixedModComponents[joinStartIndex] != "") {
                    relativePath = relativePath + "../";
                }
            }
            return relativePath + relativePathComponents.join("/");
        }
        return absoluteModPath;
    }