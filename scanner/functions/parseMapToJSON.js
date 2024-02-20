function parseMapToJSON(string, data) {
        try {
            return JSON.parse(string.replace(/^\)\]\}'/, ""));
        }
        catch (error) {
            error.sourceMapData = data;
            throw error;
        }
    }