function toggle_attribute(el, attr, state) {
        if (state == null) {
            state = !el.hasAttribute(attr);
        }
        if (state)
            el.setAttribute(attr, "true");
        else
            el.removeAttribute(attr);
    }