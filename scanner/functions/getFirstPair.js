function getFirstPair(str) {
        var index = str.indexOf('\x3B');
        return index === -1 ? str : str.substr(0, index);
    }