function __alloyId6(e) {
        if (e && e.fromAdapter) return;
        var opts = __alloyId6.opts || {};
        var models = __alloyId5.models;
        var len = models.length;
        var __alloyId1 = [];
        for (var i = 0; len > i; i++) {
            var __alloyId2 = models[i];
            __alloyId2.__transform = _.isFunction(__alloyId2.transform) ? __alloyId2.transform() : __alloyId2.toJSON();
            var __alloyId4 = {
                properties: {
                    title: __alloyId2.__transform.name,
                    modelId: __alloyId2.__transform.id
                }
            };
            __alloyId1.push(__alloyId4);
        }
        opts.animation ? $.__views.section.setItems(__alloyId1, opts.animation) : $.__views.section.setItems(__alloyId1);
    }