function Menu_FindPrevious(item) {
    var a = WebForm_GetElementByTagName(item, "A");
    var parent = Menu_FindParentContainer(item);
    var last = null;
    if (parent) {
        var links = WebForm_GetElementsByTagName(parent, "A");
        for (var i = 0; i < links.length; i++) {
            var link = links[i];
            if (Menu_IsSelectable(link)) {
                if (link == a && last) {
                    return last;
                }
                if (Menu_FindParentContainer(link) == parent) {
                    last = link;
                }
            }
        }
    }
    return last;
}