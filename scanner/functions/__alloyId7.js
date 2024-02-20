function __alloyId7() {
        $.__views.index.removeEventListener("open", __alloyId7);
        if ($.__views.index.activity) $.__views.index.activity.onCreateOptionsMenu = function(e) {
            var __alloyId4 = {
                title: "option 1",
                icon: "/ic_menu_help.png",
                id: "__alloyId3"
            };
            $.__views.__alloyId3 = e.menu.add(_.pick(__alloyId4, Alloy.Android.menuItemCreateArgs));
            $.__views.__alloyId3.applyProperties(_.omit(__alloyId4, Alloy.Android.menuItemCreateArgs));
            $.__alloyId3 = $.__views.__alloyId3;
            doClick ? $.addListener($.__views.__alloyId3, "click", doClick) : __defers["$.__views.__alloyId3!click!doClick"] = true;
            var __alloyId6 = {
                title: "option 2",
                icon: "/ic_menu_home.png",
                id: "__alloyId5"
            };
            $.__views.__alloyId5 = e.menu.add(_.pick(__alloyId6, Alloy.Android.menuItemCreateArgs));
            $.__views.__alloyId5.applyProperties(_.omit(__alloyId6, Alloy.Android.menuItemCreateArgs));
            $.__alloyId5 = $.__views.__alloyId5;
            openWin2 ? $.addListener($.__views.__alloyId5, "click", openWin2) : __defers["$.__views.__alloyId5!click!openWin2"] = true;
            $.__views.index.activity.actionBar && ($.__views.index.activity.actionBar.title = "Title from menu");
        }; else {
            Ti.API.warn("You attempted to attach an Android Menu to a lightweight Window");
            Ti.API.warn("or other UI component which does not have an Android activity.");
            Ti.API.warn("Android Menus can only be opened on TabGroups and heavyweight Windows.");
        }
    }