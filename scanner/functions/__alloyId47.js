function __alloyId47(e) {
        if (e && e.fromAdapter) return;
        __alloyId47.opts || {};
        var models = __alloyId46.models;
        var len = models.length;
        var __alloyId44 = [];
        for (var i = 0; len > i; i++) {
            var __alloyId43 = models[i];
            __alloyId43.__transform = _.isFunction(__alloyId43.transform) ? __alloyId43.transform() : __alloyId43.toJSON();
            var __alloyId45 = {
                title: __alloyId43.__transform.foo
            };
            __alloyId44.push(__alloyId45);
            __alloyId41.push(__alloyId45);
        }
        $.__views.__alloyId39.labels = __alloyId44;
    }