function deleteOldFile() {
        serverDeleteFile(makeURLAbsolute(gameSource.jsonURL, scriptURL));
    }