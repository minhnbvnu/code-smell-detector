function normalizeURL(url) {
        var hostDomainAndPortRegex = /^(https?:\/\/[\-\w\.]+(:\d+)?\/)(.*)$/i;
        var matches = hostDomainAndPortRegex.exec(url);
        if(matches) {
            var hostDomainAndPort = matches[1];
            var actualPath = matches[3];
            return hostDomainAndPort + normalizePath(actualPath);
        }
        return normalizePath(url);
    }