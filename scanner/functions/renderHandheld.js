function renderHandheld(e) {
        if (e && e.fromAdapter) return;
        renderHandheld.opts || {};
        var models = __alloyId15.models;
        var len = models.length;
        var rows = [];
        for (var i = 0; len > i; i++) {
            var __alloyId10 = models[i];
            __alloyId10.__transform = _.isFunction(__alloyId10.transform) ? __alloyId10.transform() : __alloyId10.toJSON();
            var __alloyId12 = Ti.UI.createTableViewRow({});
            rows.push(__alloyId12);
            var __alloyId14 = Ti.UI.createLabel({
                left: 5,
                text: __alloyId10.__transform.username,
                color: "blue"
            });
            __alloyId12.add(__alloyId14);
        }
        $.__views.__alloyId9.setData(rows);
    }