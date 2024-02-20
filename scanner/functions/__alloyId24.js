function __alloyId24(e) {
        if (e && e.fromAdapter) return;
        var opts = __alloyId24.opts || {};
        var models = __alloyId23.models;
        var len = models.length;
        var __alloyId19 = [];
        for (var i = 0; len > i; i++) {
            var __alloyId20 = models[i];
            __alloyId20.__transform = _.isFunction(__alloyId20.transform) ? __alloyId20.transform() : __alloyId20.toJSON();
            var __alloyId22 = {
                properties: {
                    title: __alloyId20.__transform.foo,
                    subtitle: __alloyId20.__transform.foo + " " + __alloyId20.__transform.bar + " " + __alloyId20.__transform.missing
                }
            };
            __alloyId19.push(__alloyId22);
        }
        opts.animation ? $.__views.__alloyId18.setItems(__alloyId19, opts.animation) : $.__views.__alloyId18.setItems(__alloyId19);
    }