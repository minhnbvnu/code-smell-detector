function __alloyId15() {
        $.__views.index.removeEventListener("open", __alloyId15);
        if ($.__views.index.activity) $.__views.index.activity.onCreateOptionsMenu = function(e) {
            var __alloyId12 = {
                title: "help",
                icon: "/ic_menu_help.png",
                id: "__alloyId11"
            };
            $.__views.__alloyId11 = e.menu.add(_.pick(__alloyId12, Alloy.Android.menuItemCreateArgs));
            $.__views.__alloyId11.applyProperties(_.omit(__alloyId12, Alloy.Android.menuItemCreateArgs));
            $.__alloyId11 = $.__views.__alloyId11;
            doClick ? $.addListener($.__views.__alloyId11, "click", doClick) : __defers["$.__views.__alloyId11!click!doClick"] = true;
            var __alloyId14 = {
                title: "home",
                icon: "/ic_menu_home.png",
                id: "__alloyId13"
            };
            $.__views.__alloyId13 = e.menu.add(_.pick(__alloyId14, Alloy.Android.menuItemCreateArgs));
            $.__views.__alloyId13.applyProperties(_.omit(__alloyId14, Alloy.Android.menuItemCreateArgs));
            $.__alloyId13 = $.__views.__alloyId13;
            doClick ? $.addListener($.__views.__alloyId13, "click", doClick) : __defers["$.__views.__alloyId13!click!doClick"] = true;
        }; else {
            Ti.API.warn("You attempted to attach an Android Menu to a lightweight Window");
            Ti.API.warn("or other UI component which does not have an Android activity.");
            Ti.API.warn("Android Menus can only be opened on TabGroups and heavyweight Windows.");
        }
    }