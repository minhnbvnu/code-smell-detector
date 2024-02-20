function __alloyId0() {
        $.__views.index.removeEventListener("open", __alloyId0);
        if ($.__views.index.activity) {
            $.__views.index.activity.setSupportActionBar($.__views.toolBarID);
            $.__views.index.activity.actionBar.displayHomeAsUp = true;
            $.__views.index.activity.actionBar.homeButtonEnabled = true;
        } else {
            Ti.API.warn("You attempted to access an Activity on a lightweight Window or other");
            Ti.API.warn("UI component which does not have an Android activity. Android Activities");
            Ti.API.warn("are valid with only windows in TabGroups or heavyweight Windows.");
        }
    }