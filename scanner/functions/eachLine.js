function eachLine(str, callback)
    {
        var lines = splitLines(str);

        for (var i = 0; i < lines.length; i++)
            lines[i] = callback(lines[i], i);

        // include \r to enable copy-paste on windows (ie8) without getting everything on one line
        return lines.join('\r\n');
    }