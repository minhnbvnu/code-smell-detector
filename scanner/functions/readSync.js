function readSync(read, url, data) {
        var readUrl = customDecodeUriComponent(url);
        try {
            return String(read(readUrl));
        }
        catch (error) {
            error.sourceMapData = data;
            throw error;
        }
    }