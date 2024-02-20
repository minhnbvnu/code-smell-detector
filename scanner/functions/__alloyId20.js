function __alloyId20(e) {
        if (e && e.fromAdapter) return;
        __alloyId20.opts || {};
        var models = __alloyId19.models;
        var len = models.length;
        var __alloyId17 = [];
        for (var i = 0; len > i; i++) {
            var __alloyId16 = models[i];
            __alloyId16.__transform = _.isFunction(__alloyId16.transform) ? __alloyId16.transform() : __alloyId16.toJSON();
            var __alloyId18 = {
                title: __alloyId16.__transform.foo
            };
            __alloyId17.push(__alloyId18);
            __alloyId14.push(__alloyId18);
        }
        $.__views.__alloyId12.labels = __alloyId17;
    }