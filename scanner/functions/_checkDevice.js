function _checkDevice () {

        device.pixelRatio = window['devicePixelRatio'] || 1;
        device.iPhone = navigator.userAgent.toLowerCase().indexOf('iphone') !== -1;
        device.iPhone4 = (device.pixelRatio === 2 && device.iPhone);
        device.iPad = navigator.userAgent.toLowerCase().indexOf('ipad') !== -1;

        if (typeof Int8Array !== 'undefined')
        {
            device.typedArray = true;
        }
        else
        {
            device.typedArray = false;
        }

        if (typeof ArrayBuffer !== 'undefined' && typeof Uint8Array !== 'undefined' && typeof Uint32Array !== 'undefined')
        {
            device.littleEndian = _checkIsLittleEndian();
            device.LITTLE_ENDIAN = device.littleEndian;
        }

        device.support32bit = (typeof ArrayBuffer !== 'undefined' && typeof Uint8ClampedArray !== 'undefined' && typeof Int32Array !== 'undefined' && device.littleEndian !== null && _checkIsUint8ClampedImageData());

        navigator.vibrate = navigator.vibrate || navigator.webkitVibrate || navigator.mozVibrate || navigator.msVibrate;

        if (navigator.vibrate)
        {
            device.vibration = true;
        }

    }