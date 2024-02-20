function wrapLinesWithCode(str, css)
    {
        if (str == null || str.length == 0 || str == '\n')
            return str;

        str = str.replace(/</g, '&lt;');

        // Replace two or more sequential spaces with &nbsp; leaving last space untouched.
        str = str.replace(/ {2,}/g, function(m)
        {
            var spaces = '';

            for (var i = 0; i < m.length - 1; i++)
                spaces += sh.config.space;

            return spaces + ' ';
        });

        // Split each line and apply <span class="...">...</span> to them so that
        // leading spaces aren't included.
        if (css != null)
            str = eachLine(str, function(line)
            {
                if (line.length == 0)
                    return '';

                var spaces = '';

                line = line.replace(/^(&nbsp;| )+/, function(s)
                {
                    spaces = s;
                    return '';
                });

                if (line.length == 0)
                    return spaces;

                return spaces + '<code class="' + css + '">' + line + '</code>';
            });

        return str;
    }