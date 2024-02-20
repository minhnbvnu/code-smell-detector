function __alloyId16() {
        $.__views.win2.removeEventListener("open", __alloyId16);
        if ($.__views.win2.activity) {
            $.__views.win2.activity.actionBar.backgroundImage = "/actionbackground.png";
            $.__views.win2.activity.actionBar.displayHomeAsUp = true;
            $.__views.win2.activity.actionBar.icon = "/actionicon.png";
            $.__views.win2.activity.actionBar.onHomeIconItemSelected = doHomeIcon;
        } else {
            Ti.API.warn("You attempted to access an Activity on a lightweight Window or other");
            Ti.API.warn("UI component which does not have an Android activity. Android Activities");
            Ti.API.warn("are valid with only windows in TabGroups or heavyweight Windows.");
        }
    }