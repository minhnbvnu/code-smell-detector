function __alloyId12(e) {
        if (e && e.fromAdapter) return;
        __alloyId12.opts || {};
        var models = __alloyId11.models;
        var len = models.length;
        var rows = [];
        _.each($.__views.__alloyId8.getRows(), function(r) {
            $.__views.__alloyId8.removeRow(r);
        });
        for (var i = 0; len > i; i++) {
            var __alloyId9 = models[i];
            __alloyId9.__transform = _.isFunction(__alloyId9.transform) ? __alloyId9.transform() : __alloyId9.toJSON();
            $.__views.__alloyId10 = Ti.UI.createPickerRow({
                fontSize: "18dp",
                title: __alloyId9.__transform.title,
                id: "__alloyId10"
            });
            rows.push($.__views.__alloyId10);
        }
        _.each(rows, function(row) {
            $.__views.__alloyId8.addRow(row);
        });
    }