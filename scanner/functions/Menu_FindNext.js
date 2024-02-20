function Menu_FindNext(item) {
    var a = WebForm_GetElementByTagName(item, "A");
    var parent = Menu_FindParentContainer(item);
    var first = null;
    if (parent) {
        var links = WebForm_GetElementsByTagName(parent, "A");
        var match = false;
        for (var i = 0; i < links.length; i++) {
            var link = links[i];
            if (Menu_IsSelectable(link)) {
                if (Menu_FindParentContainer(link) == parent) {
                    if (match) {
                        return link;
                    }
                    else if (!first) {
                        first = link;
                    }
                }
                if (!match && link == a) {
                    match = true;
                }
            }
        }
    }
    return first;
}