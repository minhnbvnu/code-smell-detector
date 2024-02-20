function _get_element(target) {
        let element = (0, types_1.isString)(target) ? document.getElementById(target) : target;
        if (element == null)
            throw new Error(`Error rendering Bokeh model: could not find ${(0, types_1.isString)(target) ? `#${target}` : target} HTML tag`);
        if (!(0, dom_1.contains)(document.body, element))
            throw new Error(`Error rendering Bokeh model: element ${(0, types_1.isString)(target) ? `#${target}` : target} must be under <body>`);
        // If autoload script, replace script tag with div for embedding.
        if (element instanceof HTMLElement && element.tagName == "SCRIPT") {
            const root_el = (0, dom_1.div)();
            (0, dom_1.replaceWith)(element, root_el);
            element = root_el;
        }
        return element;
    }