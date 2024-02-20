function createSVGElement(tag, attrs = null, ...children) {
        const element = document.createElementNS("http://www.w3.org/2000/svg", tag);
        for (const [attr, value] of (0, object_1.entries)(attrs !== null && attrs !== void 0 ? attrs : {})) {
            if (value == null || value === false)
                continue;
            element.setAttribute(attr, value);
        }
        function append(child) {
            if ((0, types_1.isString)(child))
                element.appendChild(document.createTextNode(child));
            else if (child instanceof Node)
                element.appendChild(child);
            else if (child instanceof NodeList || child instanceof HTMLCollection) {
                for (const el of child) {
                    element.appendChild(el);
                }
            }
            else if (child != null && child !== false)
                throw new Error(`expected a DOM element, string, false or null, got ${JSON.stringify(child)}`);
        }
        for (const child of children) {
            if ((0, types_1.isArray)(child)) {
                for (const _child of child)
                    append(_child);
            }
            else
                append(child);
        }
        return element;
    }