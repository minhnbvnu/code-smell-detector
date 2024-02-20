function shaker(event) {
        if (!event || event.propertyName === 'left') {
            el.style.left = x + dx + 'px';
            if (!shakes--) {
                el.removeEventListener('transitionend', shaker);
                transitions.pop();
                el.style.transition = transitions.join(',');
                el.style.position = position;
                if (options.callback) {
                    options.callback.call(context, options);
                }
            }
            dx = shakes ? -dx : 0;
        }
    }