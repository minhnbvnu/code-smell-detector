function __alloyId2() {
        $.__views.index.removeEventListener("open", __alloyId2);
        if ($.__views.index.activity) $.__views.index.activity.onCreateOptionsMenu = function(e) {
            var __alloyId0 = {
                showAsAction: Ti.Android.SHOW_AS_ACTION_ALWAYS,
                title: "One",
                id: "item1"
            };
            $.__views.item1 = e.menu.add(_.pick(__alloyId0, Alloy.Android.menuItemCreateArgs));
            $.__views.item1.applyProperties(_.omit(__alloyId0, Alloy.Android.menuItemCreateArgs));
            $.item1 = $.__views.item1;
            doMenuClick ? $.addListener($.__views.item1, "click", doMenuClick) : __defers["$.__views.item1!click!doMenuClick"] = true;
            var __alloyId1 = {
                showAsAction: Ti.Android.SHOW_AS_ACTION_ALWAYS,
                title: "Two",
                icon: Ti.Android.R.drawable.ic_menu_share,
                id: "item2"
            };
            $.__views.item2 = e.menu.add(_.pick(__alloyId1, Alloy.Android.menuItemCreateArgs));
            $.__views.item2.applyProperties(_.omit(__alloyId1, Alloy.Android.menuItemCreateArgs));
            $.item2 = $.__views.item2;
            doMenuClick ? $.addListener($.__views.item2, "click", doMenuClick) : __defers["$.__views.item2!click!doMenuClick"] = true;
            if ($.__views.index.activity.actionBar) {
                $.__views.index.activity.actionBar.title = "Menu Title";
                $.__views.index.activity.actionBar.subtitle = "menu subtitle";
                $.__views.index.activity.actionBar.displayHomeAsUp = true;
            }
        }; else {
            Ti.API.warn("You attempted to attach an Android Menu to a lightweight Window");
            Ti.API.warn("or other UI component which does not have an Android activity.");
            Ti.API.warn("Android Menus can only be opened on TabGroups and heavyweight Windows.");
        }
    }