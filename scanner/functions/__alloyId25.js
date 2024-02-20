function __alloyId25(e) {
        if (e && e.fromAdapter) return;
        __alloyId25.opts || {};
        var models = __alloyId24.models;
        var len = models.length;
        var rows = [];
        for (var i = 0; len > i; i++) {
            var __alloyId21 = models[i];
            __alloyId21.__transform = _.isFunction(__alloyId21.transform) ? __alloyId21.transform() : __alloyId21.toJSON();
            var __alloyId23 = Alloy.createWidget("com.foo.widget", "row_bind", {
                $model: __alloyId21
            });
            rows.push(__alloyId23.getViewEx({
                recurse: true
            }));
        }
        $.__views.bindingTable.setData(rows);
    }