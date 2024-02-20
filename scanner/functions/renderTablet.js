function renderTablet(e) {
        if (e && e.fromAdapter) return;
        renderTablet.opts || {};
        var models = __alloyId8.models;
        var len = models.length;
        var rows = [];
        for (var i = 0; len > i; i++) {
            var __alloyId3 = models[i];
            __alloyId3.__transform = _.isFunction(__alloyId3.transform) ? __alloyId3.transform() : __alloyId3.toJSON();
            var __alloyId5 = Ti.UI.createTableViewRow({});
            rows.push(__alloyId5);
            var __alloyId7 = Ti.UI.createLabel({
                left: 5,
                text: __alloyId3.__transform.username,
                color: "red"
            });
            __alloyId5.add(__alloyId7);
        }
        $.__views.__alloyId2.setData(rows);
    }