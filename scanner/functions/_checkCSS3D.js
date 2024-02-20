function _checkCSS3D () {

        var el = document.createElement('p');
        var has3d;
        var transforms = {
            'webkitTransform': '-webkit-transform',
            'OTransform': '-o-transform',
            'msTransform': '-ms-transform',
            'MozTransform': '-moz-transform',
            'transform': 'transform'
        };

        // Add it to the body to get the computed style.
        document.body.insertBefore(el, null);

        for (var t in transforms)
        {
            if (el.style[t] !== undefined)
            {
                el.style[t] = "translate3d(1px,1px,1px)";
                has3d = window.getComputedStyle(el).getPropertyValue(transforms[t]);
            }
        }

        document.body.removeChild(el);
        device.css3D = (has3d !== undefined && has3d.length > 0 && has3d !== "none");

    }