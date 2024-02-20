function set_prefixed_property_css(element, property, value, extra) {
            element.style.cssText = prefixes.join(property + ':' + value + ';') + (extra || '');
        }