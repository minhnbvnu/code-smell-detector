function changePathToTS(modPath) {
        return trimModName(stripQuotes(modPath)) + ".ts";
    }