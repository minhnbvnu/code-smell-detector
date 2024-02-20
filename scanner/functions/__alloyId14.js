function __alloyId14() {
        $.__views.index.removeEventListener("open", __alloyId14);
        if ($.__views.index.activity) $.__views.index.activity.onCreateOptionsMenu = function(e) {
            var __alloyId11 = {
                title: "Show alert",
                id: "__alloyId10"
            };
            $.__views.__alloyId10 = e.menu.add(_.pick(__alloyId11, Alloy.Android.menuItemCreateArgs));
            $.__views.__alloyId10.applyProperties(_.omit(__alloyId11, Alloy.Android.menuItemCreateArgs));
            $.__alloyId10 = $.__views.__alloyId10;
            doClick ? $.addListener($.__views.__alloyId10, "click", doClick) : __defers["$.__views.__alloyId10!click!doClick"] = true;
            var __alloyId13 = {
                title: "Open Win2",
                id: "__alloyId12"
            };
            $.__views.__alloyId12 = e.menu.add(_.pick(__alloyId13, Alloy.Android.menuItemCreateArgs));
            $.__views.__alloyId12.applyProperties(_.omit(__alloyId13, Alloy.Android.menuItemCreateArgs));
            $.__alloyId12 = $.__views.__alloyId12;
            openWin2 ? $.addListener($.__views.__alloyId12, "click", openWin2) : __defers["$.__views.__alloyId12!click!openWin2"] = true;
            $.__views.index.activity.actionBar && ($.__views.index.activity.actionBar.title = "Title from menu");
        }; else {
            Ti.API.warn("You attempted to attach an Android Menu to a lightweight Window");
            Ti.API.warn("or other UI component which does not have an Android activity.");
            Ti.API.warn("Android Menus can only be opened on TabGroups and heavyweight Windows.");
        }
    }