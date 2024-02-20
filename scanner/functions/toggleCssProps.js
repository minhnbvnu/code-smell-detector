function toggleCssProps(manager, add) {
            var element = manager.element;
            if (!element.style) {
                return;
            }
            var prop;
            each(manager.options.cssProps, function (value, name) {
                prop = prefixed(element.style, name);
                if (add) {
                    manager.oldCssProps[prop] = element.style[prop];
                    element.style[prop] = value;
                }
                else {
                    element.style[prop] = manager.oldCssProps[prop] || '';
                }
            });
            if (!add) {
                manager.oldCssProps = {};
            }
        }