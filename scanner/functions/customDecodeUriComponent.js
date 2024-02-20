function customDecodeUriComponent(string) {
        // `decodeUriComponentLib` turns `+` into ` `, but that's not wanted.
        return decodeUriComponentLib(string.replace(/\+/g, "%2B"));
    }