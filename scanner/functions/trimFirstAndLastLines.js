function trimFirstAndLastLines(str)
    {
        return str.replace(/^[ ]*[\n]+|[\n]*[ ]*$/g, '');
    }