function __alloyId65(e) {
        if (e && e.fromAdapter) return;
        __alloyId65.opts || {};
        var models = __alloyId64.models;
        var len = models.length;
        var __alloyId62 = [];
        for (var i = 0; len > i; i++) {
            var __alloyId61 = models[i];
            __alloyId61.__transform = myTransformer(__alloyId61);
            var __alloyId63 = {
                title: __alloyId61.__transform.foo + " and " + __alloyId61.__transform.bar
            };
            __alloyId62.push(__alloyId63);
            __alloyId59.push(__alloyId63);
        }
        $.__views.__alloyId57.labels = __alloyId62;
    }