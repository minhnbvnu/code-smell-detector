function __alloyId35(e) {
        if (e && e.fromAdapter) return;
        var opts = __alloyId35.opts || {};
        var models = __alloyId34.models;
        var len = models.length;
        var __alloyId28 = [];
        for (var i = 0; len > i; i++) {
            var __alloyId31 = models[i];
            __alloyId31.__transform = _.isFunction(__alloyId31.transform) ? __alloyId31.transform() : __alloyId31.toJSON();
            var __alloyId33 = Alloy.createController("inherit", {
                $model: __alloyId31
            });
            __alloyId28.push(__alloyId33.getViewEx({
                recurse: true
            }));
        }
        opts.animation ? $.__views.__alloyId27.setItems(__alloyId28, opts.animation) : $.__views.__alloyId27.setItems(__alloyId28);
    }