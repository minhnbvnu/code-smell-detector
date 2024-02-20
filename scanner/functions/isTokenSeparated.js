function isTokenSeparated(stream) {
        return stream.sol() ||
            stream.string.charAt(stream.start - 1) == " " ||
            stream.string.charAt(stream.start - 1) == "\t";
    }