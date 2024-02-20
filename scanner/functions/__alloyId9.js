function __alloyId9(e) {
        if (e && e.fromAdapter) return;
        __alloyId9.opts || {};
        var models = __alloyId8.models;
        var len = models.length;
        var rows = [];
        for (var i = 0; len > i; i++) {
            var __alloyId1 = models[i];
            __alloyId1.__transform = _.isFunction(__alloyId1.transform) ? __alloyId1.transform() : __alloyId1.toJSON();
            var __alloyId3 = Ti.UI.createTableViewRow({});
            rows.push(__alloyId3);
            var __alloyId5 = Ti.UI.createView({
                backgroundColor: "#efefef",
                height: "60dp"
            });
            __alloyId3.add(__alloyId5);
            test ? $.addListener(__alloyId5, "click", test) : __defers["__alloyId5!click!test"] = true;
            var __alloyId7 = Ti.UI.createLabel({
                left: "100dp",
                right: "10dp",
                height: Ti.UI.SIZE,
                textAlign: "left",
                color: "#181818",
                font: {
                    fontSize: "32dp",
                    fontWeight: "bold"
                },
                touchEnabled: false,
                text: "Location"
            });
            __alloyId5.add(__alloyId7);
        }
        $.__views.__alloyId0.setData(rows);
    }