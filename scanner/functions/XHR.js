function XHR(opts) {
        var xdomain = opts.xdomain; // XMLHttpRequest can be disabled on IE

        try {
            if ("undefined" !== typeof XMLHttpRequest && (!xdomain || hasCORS)) {
                return new XMLHttpRequest();
            }
        } catch (e) {}

        if (!xdomain) {
            try {
                return new globalThisShim[["Active"].concat("Object").join("X")]("Microsoft.XMLHTTP");
            } catch (e) {}
        }
    }