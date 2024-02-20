function loopMenus(items, groupTitle) {
        items.forEach(function(item) {
            if (typeof item == "object" && Array.isArray(item.items)) {
                if (item.title != "Help" && item.title != "帮助") {
                    var title = (groupTitle == "" ? "" : groupTitle + "->") + item.title;
                    loopMenus(item.items, title);
                }
            }
            if (item != "-" && typeof item == "string") {
                var command = commands.valueForKey(item);
                var itemView = ui.view([500, 40]);
                var itemLabel = groupTitle + "->" + command.name();
                var labelView = ui.button(itemLabel, [10, 10, 400, 20]);
                labelView.setBordered("NO");
                labelView.sizeToFit();
                labelView.setCOSJSTargetFunction(function(sender) {
                    var menu = pluginMenu + "->" + pluginName + "->" + sender.title();
                    pasteboard.copy(menu);
                    sketch.UI.message('"' + menu + '" copied.');
                });
                var shortcutView = ui.textField("", [400, 10, 80, 20]);
                itemView.addSubview(labelView);
                itemView.addSubview(shortcutView);
                if (shortcuts && shortcutMenuTitles.includes(itemLabel)) {
                    var shortcutKeys = shortcuts.allValues().objectAtIndex(shortcutMenuTitles.indexOf(itemLabel));
                    if (shortcutKeys) {
                        shortcutView.setStringValue(shortcutKeys);
                    }
                }
                commandViews.push(itemView);
            }
        });
    }