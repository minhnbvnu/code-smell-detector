function hideAllMenu (e) {
        var tgt = e.target || e.srcElement,
            cur = domUtils.findParent (tgt , function (node) {
                return domUtils.hasClass (node , "edui-shortcutmenu") || domUtils.hasClass (node , "edui-popup");
            } , true);

        if (!cur) {
            for (var i = 0, menu ; menu = allMenus[i++] ;) {
                menu.hide ()
            }
        }
    }