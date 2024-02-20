function __alloyId30(e) {
        if (e && e.fromAdapter) return;
        var opts = __alloyId30.opts || {};
        var models = __alloyId29.models;
        var len = models.length;
        var __alloyId19 = [];
        for (var i = 0; len > i; i++) {
            var __alloyId26 = models[i];
            __alloyId26.__transform = _.isFunction(__alloyId26.transform) ? __alloyId26.transform() : __alloyId26.toJSON();
            var __alloyId28 = {
                properties: {
                    title: __alloyId26.__transform.title
                }
            };
            __alloyId19.push(__alloyId28);
        }
        opts.animation ? $.__views.__alloyId18.setItems(__alloyId19, opts.animation) : $.__views.__alloyId18.setItems(__alloyId19);
    }