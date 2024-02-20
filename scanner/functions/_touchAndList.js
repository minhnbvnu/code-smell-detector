function _touchAndList(view, target, pageX, pageY, screenX, screenY, clientX, clientY) {
        return _touchList(_touch.apply(null, arguments));
    }