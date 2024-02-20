function documentFromHTML(src) {
    return function(html) {
        var parser = new DOMParser(), doc;
        try {
            doc = parser.parseFromString(html, "text/html");
        } catch(e) {
            log("DOMParser not supported, falling back to createHTMLDocument");
            doc = document.implementation.createHTMLDocument("");
            try {
                doc.open();
                doc.write(html);
                doc.close();
            } catch(ee) {
                log("createHTMLDocument write not supported, falling back to document.body.innerHTML");
                doc.body.innerHTML = html; // ie9 doesnt support writing to documentElement
            }
        }

        var b = doc.querySelector("base");
        if (!b || !b.href.host) {
            var base = doc.createElement("base");
            base.href = src;
            doc.head.insertBefore(base, doc.head.firstChild);
        }

        return doc;
    };
}