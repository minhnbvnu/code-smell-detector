function parseTrue ()
    {
        var str = "true";

        for (var i = 0; i < str.length; ++i)
            if (current() !== str.charCodeAt(i))
                return undefined;
            else
                consume();
        return true;
    }