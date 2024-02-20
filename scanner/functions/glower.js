function glower(event) {
        var was = styleWas[event.propertyName];
        if (was.undo) {
            el.style[event.propertyName] = was.style;
            was.undo = false;
        } else if (!--values) {
            el.removeEventListener('transitionend', glower);
            el.style.transition = transition;
            if (options.callback) {
                options.callback.call(context, options);
            }
        }
    }