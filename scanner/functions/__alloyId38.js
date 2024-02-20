function __alloyId38(e) {
        if (e && e.fromAdapter) return;
        __alloyId38.opts || {};
        var models = __alloyId37.models;
        var len = models.length;
        var __alloyId35 = [];
        for (var i = 0; len > i; i++) {
            var __alloyId34 = models[i];
            __alloyId34.__transform = myTransformer(__alloyId34);
            var __alloyId36 = {
                title: __alloyId34.__transform.foo + " and " + __alloyId34.__transform.bar
            };
            __alloyId35.push(__alloyId36);
            __alloyId32.push(__alloyId36);
        }
        $.__views.__alloyId30.labels = __alloyId35;
    }