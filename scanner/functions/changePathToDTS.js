function changePathToDTS(modPath) {
        return trimModName(stripQuotes(modPath)) + ".d.ts";
    }