function __alloyId17(e) {
        if (e && e.fromAdapter) return;
        var opts = __alloyId17.opts || {};
        var models = __alloyId16.models;
        var len = models.length;
        var __alloyId12 = [];
        for (var i = 0; len > i; i++) {
            var __alloyId13 = models[i];
            __alloyId13.__transform = _.isFunction(__alloyId13.transform) ? __alloyId13.transform() : __alloyId13.toJSON();
            var __alloyId15 = {
                properties: {
                    font: __alloyId13.__transform.font,
                    title: "well " + __alloyId13.__transform.greeting + " there " + __alloyId13.__transform.subject + "!"
                }
            };
            __alloyId12.push(__alloyId15);
        }
        opts.animation ? $.__views.__alloyId11.setItems(__alloyId12, opts.animation) : $.__views.__alloyId11.setItems(__alloyId12);
    }