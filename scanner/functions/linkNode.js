function linkNode(child, href, target){
        var a = scn("a", HYPERLINK_CLASS_NAME, child);
        a.setAttribute('href', href);
        a.setAttribute('target', target);
        return a;
    }