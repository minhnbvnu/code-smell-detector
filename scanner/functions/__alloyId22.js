function __alloyId22() {
        $.__views.win2.removeEventListener("open", __alloyId22);
        if ($.__views.win2.activity) $.__views.win2.activity.onCreateOptionsMenu = function(e) {
            var __alloyId19 = {
                title: "require 1",
                icon: "/ic_menu_goto.png",
                id: "__alloyId18"
            };
            $.__views.__alloyId18 = e.menu.add(_.pick(__alloyId19, Alloy.Android.menuItemCreateArgs));
            $.__views.__alloyId18.applyProperties(_.omit(__alloyId19, Alloy.Android.menuItemCreateArgs));
            $.__alloyId18 = $.__views.__alloyId18;
            doClick ? $.addListener($.__views.__alloyId18, "click", doClick) : __defers["$.__views.__alloyId18!click!doClick"] = true;
            var __alloyId21 = {
                title: "require 2",
                icon: "/ic_menu_manage.png",
                id: "__alloyId20"
            };
            $.__views.__alloyId20 = e.menu.add(_.pick(__alloyId21, Alloy.Android.menuItemCreateArgs));
            $.__views.__alloyId20.applyProperties(_.omit(__alloyId21, Alloy.Android.menuItemCreateArgs));
            $.__alloyId20 = $.__views.__alloyId20;
            doClick ? $.addListener($.__views.__alloyId20, "click", doClick) : __defers["$.__views.__alloyId20!click!doClick"] = true;
        }; else {
            Ti.API.warn("You attempted to attach an Android Menu to a lightweight Window");
            Ti.API.warn("or other UI component which does not have an Android activity.");
            Ti.API.warn("Android Menus can only be opened on TabGroups and heavyweight Windows.");
        }
    }