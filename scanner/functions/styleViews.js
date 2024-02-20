function styleViews(styles) {
        var views = [];
        styles.forEach(function(style) {
            var itemView = ui.view([400, 40]);
            var label = "        " + style.name + " (" + style.getAllInstancesLayers().length + ")";
            var checkbox = ui.checkBox(false, label, [10, 0, 380, 40]);
            var image;
            if (style.style.styleType == "Layer") {
                image = preview.layerStyle(style.sketchObject);
            }
            if (style.style.styleType == "Text") {
                image = preview.textStyleSmall(style.sketchObject);
            }
            var imageView = ui.image(image, [30, 8, 24, 24]);
            itemView.addSubview(checkbox);
            itemView.addSubview(imageView);
            views.push(itemView);

            checkbox.setCOSJSTargetFunction(function(sender) {
                var parent = sender.superview().superview();
                parent.subviews().forEach(function(subview1) {
                    subview1.subviews().forEach(function(subview2) {
                        if (subview2.class() == "NSButton") {
                            subview2.setState(NSOffState);
                        }
                    });
                });
                sender.setState(NSOnState);
            });
        });
        return views;
    }