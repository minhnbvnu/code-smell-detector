function __alloyId10(e) {
        if (e && e.fromAdapter) return;
        __alloyId10.opts || {};
        var models = __alloyId9.models;
        var len = models.length;
        var rows = [];
        for (var i = 0; len > i; i++) {
            var __alloyId6 = models[i];
            __alloyId6.__transform = {};
            var __alloyId8 = Ti.UI.createTableViewRow({
                title: "undefined" != typeof __alloyId6.__transform["name"] ? __alloyId6.__transform["name"] : __alloyId6.get("name")
            });
            rows.push(__alloyId8);
        }
        $.__views.table.setData(rows);
    }