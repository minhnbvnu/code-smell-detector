function getSourceMappingUrl(code) {
        var match = code.match(sourceMappingURLRegex);
        return match ? match[1] || match[2] || "" : null;
    }