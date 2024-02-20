function __alloyId11(e) {
        if (e && e.fromAdapter) return;
        __alloyId11.opts || {};
        var models = __alloyId10.models;
        var len = models.length;
        var rows = [];
        for (var i = 0; len > i; i++) {
            var __alloyId3 = models[i];
            __alloyId3.__transform = _.isFunction(__alloyId3.transform) ? __alloyId3.transform() : __alloyId3.toJSON();
            var __alloyId5 = Ti.UI.createTableViewRow({});
            rows.push(__alloyId5);
            var __alloyId7 = Ti.UI.createLabel({
                left: 5,
                font: {
                    fontSize: "18px"
                },
                color: "black",
                text: __alloyId3.__transform.name
            });
            __alloyId5.add(__alloyId7);
            var __alloyId9 = Ti.UI.createSwitch({
                right: 5,
                value: __alloyId3.__transform.status
            });
            __alloyId5.add(__alloyId9);
        }
        $.__views.table.setData(rows);
    }