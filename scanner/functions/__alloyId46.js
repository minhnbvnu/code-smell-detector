function __alloyId46(e) {
        if (e && e.fromAdapter) return;
        var opts = __alloyId46.opts || {};
        var models = __alloyId45.models;
        var len = models.length;
        var __alloyId39 = [];
        for (var i = 0; len > i; i++) {
            var __alloyId42 = models[i];
            __alloyId42.__transform = _.isFunction(__alloyId42.transform) ? __alloyId42.transform() : __alloyId42.toJSON();
            var __alloyId44 = Alloy.createController("inherit", {
                $model: __alloyId42
            });
            __alloyId39.push(__alloyId44.getViewEx({
                recurse: true
            }));
        }
        opts.animation ? $.__views.__alloyId38.setItems(__alloyId39, opts.animation) : $.__views.__alloyId38.setItems(__alloyId39);
    }