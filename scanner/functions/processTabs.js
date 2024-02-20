function processTabs(code, tabSize)
    {
        var tab = '';

        for (var i = 0; i < tabSize; i++)
            tab += ' ';

        return code.replace(/\t/g, tab);
    }