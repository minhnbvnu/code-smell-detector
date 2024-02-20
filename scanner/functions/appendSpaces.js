function appendSpaces(str, longest)
    {
        var len = Math.max(0, longest - str.length);
        return str + Array(len + 1).join(' ');
    }