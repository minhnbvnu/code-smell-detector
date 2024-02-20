function __alloyId29(e) {
        if (e && e.fromAdapter) return;
        var opts = __alloyId29.opts || {};
        var models = __alloyId28.models;
        var len = models.length;
        var __alloyId18 = [];
        for (var i = 0; len > i; i++) {
            var __alloyId25 = models[i];
            __alloyId25.__transform = {};
            var __alloyId27 = {
                properties: {
                    title: "undefined" != typeof __alloyId25.__transform["title"] ? __alloyId25.__transform["title"] : __alloyId25.get("title")
                }
            };
            __alloyId18.push(__alloyId27);
        }
        opts.animation ? $.__views.__alloyId17.setItems(__alloyId18, opts.animation) : $.__views.__alloyId17.setItems(__alloyId18);
    }