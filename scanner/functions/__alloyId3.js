function __alloyId3() {
        $.__views.index.removeEventListener("open", __alloyId3);
        if ($.__views.index.activity) $.__views.index.activity.onCreateOptionsMenu = function(e) {
            $.__views.__alloyId2 = Alloy.createWidget("alloy.button", "widget", {
                title: "android",
                id: "__alloyId2",
                __parentSymbol: e.menu
            });
            doSave ? $.__views.__alloyId2.on("click", doSave) : __defers["$.__views.__alloyId2!click!doSave"] = true;
        }; else {
            Ti.API.warn("You attempted to attach an Android Menu to a lightweight Window");
            Ti.API.warn("or other UI component which does not have an Android activity.");
            Ti.API.warn("Android Menus can only be opened on TabGroups and heavyweight Windows.");
        }
    }