function processUrls(code)
    {
        var gt = /(.*)((&gt;|&lt;).*)/;

        return code.replace(sh.regexLib.url, function(m)
        {
            var suffix = '',
                match = null
                ;

            // We include &lt; and &gt; in the URL for the common cases like <http://google.com>
            // The problem is that they get transformed into &lt;http://google.com&gt;
            // Where as &gt; easily looks like part of the URL string.

            if (match = gt.exec(m))
            {
                m = match[1];
                suffix = match[2];
            }

            return '<a href="' + m + '">' + m + '</a>' + suffix;
        });
    }