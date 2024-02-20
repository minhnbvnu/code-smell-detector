function __alloyId56(e) {
        if (e && e.fromAdapter) return;
        __alloyId56.opts || {};
        var models = __alloyId55.models;
        var len = models.length;
        var __alloyId53 = [];
        for (var i = 0; len > i; i++) {
            var __alloyId52 = models[i];
            __alloyId52.__transform = _.isFunction(__alloyId52.transform) ? __alloyId52.transform() : __alloyId52.toJSON();
            var __alloyId54 = {
                title: __alloyId52.__transform.foo + " and " + __alloyId52.__transform.bar
            };
            __alloyId53.push(__alloyId54);
            __alloyId50.push(__alloyId54);
        }
        $.__views.__alloyId48.labels = __alloyId53;
    }