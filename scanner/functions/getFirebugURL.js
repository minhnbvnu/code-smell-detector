function getFirebugURL()
    {
        var scripts = document.getElementsByTagName("script");
        for (var i = 0; i < scripts.length; ++i)
        {
            if (scripts[i].src.indexOf("firebug.js") != -1)
            {
                var lastSlash = scripts[i].src.lastIndexOf("/");
                return scripts[i].src.substr(0, lastSlash);
            }
        }
    }