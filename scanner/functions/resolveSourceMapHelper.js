function resolveSourceMapHelper(code, codeUrl) {
        codeUrl = convertWindowsPath(codeUrl);
        var url = getSourceMappingUrl(code);
        if (!url) {
            return null;
        }
        var dataUri = url.match(dataUriRegex);
        if (dataUri) {
            var mimeType = dataUri[1] || "text/plain";
            var lastParameter = dataUri[2] || "";
            var encoded = dataUri[3] || "";
            var data = {
                sourceMappingURL: url,
                url: null,
                sourcesRelativeTo: codeUrl,
                map: encoded
            };
            if (!jsonMimeTypeRegex.test(mimeType)) {
                var error = new Error("Unuseful data uri mime type: " + mimeType);
                error.sourceMapData = data;
                throw error;
            }
            try {
                data.map = parseMapToJSON(lastParameter === ";base64" ? decodeBase64String(encoded) : decodeURIComponent(encoded), data);
            }
            catch (error) {
                error.sourceMapData = data;
                throw error;
            }
            return data;
        }
        var mapUrl = resolveUrl(codeUrl, url);
        return {
            sourceMappingURL: url,
            url: mapUrl,
            sourcesRelativeTo: mapUrl,
            map: null
        };
    }