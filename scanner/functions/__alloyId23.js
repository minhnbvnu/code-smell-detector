function __alloyId23(e) {
        if (e && e.fromAdapter) return;
        __alloyId23.opts || {};
        var models = __alloyId22.models;
        var len = models.length;
        var rows = [];
        for (var i = 0; len > i; i++) {
            var __alloyId19 = models[i];
            __alloyId19.__transform = _.isFunction(__alloyId19.transform) ? __alloyId19.transform() : __alloyId19.toJSON();
            var __alloyId21 = Alloy.createWidget("com.foo.widget", "row_bind", {
                $model: __alloyId19
            });
            rows.push(__alloyId21.getViewEx({
                recurse: true
            }));
        }
        $.__views.bindingTable.setData(rows);
    }