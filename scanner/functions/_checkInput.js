function _checkInput () {

        if ('ontouchstart' in document.documentElement || (window.navigator.maxTouchPoints && window.navigator.maxTouchPoints >= 1))
        {
            device.touch = true;
        }

        if (window.navigator.msPointerEnabled || window.navigator.pointerEnabled)
        {
            device.mspointer = true;
        }

        if (!device.cocoonJS)
        {
            // See https://developer.mozilla.org/en-US/docs/Web/Events/wheel
            if ('onwheel' in window || (device.ie && 'WheelEvent' in window))
            {
                // DOM3 Wheel Event: FF 17+, IE 9+, Chrome 31+, Safari 7+
                device.wheelEvent = 'wheel';
            }
            else if ('onmousewheel' in window)
            {
                // Non-FF legacy: IE 6-9, Chrome 1-31, Safari 5-7.
                device.wheelEvent = 'mousewheel';
            }
            else if (device.firefox && 'MouseScrollEvent' in window)
            {
                // FF prior to 17. This should probably be scrubbed.
                device.wheelEvent = 'DOMMouseScroll';
            }
        }

    }