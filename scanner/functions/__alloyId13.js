function __alloyId13(e) {
        if (e && e.fromAdapter) return;
        __alloyId13.opts || {};
        var models = __alloyId12.models;
        var len = models.length;
        var rows = [];
        for (var i = 0; len > i; i++) {
            var __alloyId5 = models[i];
            __alloyId5.__transform = _.isFunction(__alloyId5.transform) ? __alloyId5.transform() : __alloyId5.toJSON();
            var __alloyId7 = Ti.UI.createTableViewRow({});
            rows.push(__alloyId7);
            var __alloyId9 = Ti.UI.createLabel({
                left: 5,
                text: __alloyId5.__transform.name
            });
            __alloyId7.add(__alloyId9);
            var __alloyId11 = Ti.UI.createSwitch({
                right: 5,
                value: __alloyId5.__transform.status
            });
            __alloyId7.add(__alloyId11);
        }
        $.__views.table.setData(rows);
    }