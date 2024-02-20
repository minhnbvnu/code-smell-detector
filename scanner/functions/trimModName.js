function trimModName(modName) {
        if(modName.length > 6 && modName.substring(modName.length - 6, modName.length) == ".d.str") {
            return modName.substring(0, modName.length - 6);
        }
        if(modName.length > 4 && modName.substring(modName.length - 4, modName.length) == ".str") {
            return modName.substring(0, modName.length - 4);
        }
        if(modName.length > 5 && modName.substring(modName.length - 5, modName.length) == ".d.ts") {
            return modName.substring(0, modName.length - 5);
        }
        if(modName.length > 3 && modName.substring(modName.length - 3, modName.length) == ".ts") {
            return modName.substring(0, modName.length - 3);
        }
        if(modName.length > 3 && modName.substring(modName.length - 3, modName.length) == ".js") {
            return modName.substring(0, modName.length - 3);
        }
        return modName;
    }