function __alloyId18(e) {
        if (e && e.fromAdapter) return;
        __alloyId18.opts || {};
        var models = __alloyId17.models;
        var len = models.length;
        var rows = [];
        for (var i = 0; len > i; i++) {
            var __alloyId14 = models[i];
            __alloyId14.__transform = _.isFunction(__alloyId14.transform) ? __alloyId14.transform() : __alloyId14.toJSON();
            var __alloyId16 = Ti.UI.createTableViewRow({
                color: "black",
                font: {
                    fontSize: "18dp"
                },
                title: __alloyId14.__transform.title
            });
            rows.push(__alloyId16);
        }
        $.__views.__alloyId13.setData(rows);
    }