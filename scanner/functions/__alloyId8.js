function __alloyId8() {
        $.__views.index.removeEventListener("open", __alloyId8);
        if ($.__views.index.activity) {
            $.__views.index.activity.actionBar.title = "My App Title";
            $.__views.index.activity.actionBar.subtitle = "App subtitle";
            $.__views.index.activity.actionBar.backgroundImage = "/actionbackground.png";
            $.__views.index.activity.actionBar.icon = "/actionicon.png";
        } else {
            Ti.API.warn("You attempted to access an Activity on a lightweight Window or other");
            Ti.API.warn("UI component which does not have an Android activity. Android Activities");
            Ti.API.warn("are valid with only windows in TabGroups or heavyweight Windows.");
        }
    }