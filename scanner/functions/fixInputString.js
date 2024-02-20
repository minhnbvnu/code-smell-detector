function fixInputString(str)
    {
        var br = /<br\s*\/?>|&lt;br\s*\/?&gt;/gi;

        if (sh.config.bloggerMode == true)
            str = str.replace(br, '\n');

        if (sh.config.stripBrs == true)
            str = str.replace(br, '');

        return str;
    }