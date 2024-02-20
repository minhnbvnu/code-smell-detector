function loc_array (loc) {
        return [
            loc.hostname,
            loc.port || (loc.protocol === 'http:' ? '80' : '443'),
            loc.protocol
        ];
    }