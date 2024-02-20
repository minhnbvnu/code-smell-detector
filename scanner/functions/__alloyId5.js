function __alloyId5() {
        $.__views.index.removeEventListener("open", __alloyId5);
        if ($.__views.index.activity) $.__views.index.activity.onCreateOptionsMenu = function(e) {
            var __alloyId4 = {
                title: "Add",
                showAsAction: Ti.Android.SHOW_AS_ACTION_ALWAYS,
                id: "__alloyId3"
            };
            $.__views.__alloyId3 = e.menu.add(_.pick(__alloyId4, Alloy.Android.menuItemCreateArgs));
            $.__views.__alloyId3.applyProperties(_.omit(__alloyId4, Alloy.Android.menuItemCreateArgs));
            $.__alloyId3 = $.__views.__alloyId3;
            doClick ? $.addListener($.__views.__alloyId3, "click", doClick) : __defers["$.__views.__alloyId3!click!doClick"] = true;
        }; else {
            Ti.API.warn("You attempted to attach an Android Menu to a lightweight Window");
            Ti.API.warn("or other UI component which does not have an Android activity.");
            Ti.API.warn("Android Menus can only be opened on TabGroups and heavyweight Windows.");
        }
    }