function isEnclosure(str) {
        var lastChar = str.slice(-1);
        var enclosureStart;
        switch (lastChar) {
            case '}':
                enclosureStart = '{';
                break;
            case ']':
                enclosureStart = '[';
                break;
            default:
                return false;
        }
        var foundIndex = str.indexOf(enclosureStart);
        if (foundIndex < 0) {
            return false;
        }
        return str.slice(foundIndex + 1, -1).includes(slash);
    }