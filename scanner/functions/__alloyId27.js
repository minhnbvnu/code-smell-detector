function __alloyId27(e) {
        if (e && e.fromAdapter) return;
        var opts = __alloyId27.opts || {};
        var models = __alloyId26.models;
        var len = models.length;
        var __alloyId22 = [];
        for (var i = 0; len > i; i++) {
            var __alloyId23 = models[i];
            __alloyId23.__transform = doTransform(__alloyId23);
            var __alloyId25 = {
                template: __alloyId23.__transform.template,
                title: {
                    text: __alloyId23.__transform.title
                },
                subtitle: {
                    text: __alloyId23.__transform.subtitle
                },
                image: {
                    image: __alloyId23.__transform.image
                }
            };
            __alloyId22.push(__alloyId25);
        }
        opts.animation ? $.__views.section.setItems(__alloyId22, opts.animation) : $.__views.section.setItems(__alloyId22);
    }