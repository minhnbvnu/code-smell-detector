function addJavaScript(name, escape, closeType) {
        var prfx  =  "js-" + name + "-",
            rootTokens = name === "block" ? ["start"] : ["start", "no_regex"];
        add(
            JSRules
            , prfx
            , escape
            , rootTokens
            , closeType
        );
    }