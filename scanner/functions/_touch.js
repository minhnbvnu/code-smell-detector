function _touch(view, target, pageX, pageY, screenX, screenY, clientX, clientY) {

        return new Touch({
            target:target,
            identifier:_uuid(),
            pageX: pageX,
            pageY: pageY,
            screenX: screenX,
            screenY: screenY,
            clientX: clientX || screenX,
            clientY: clientY || screenY
        });
    }