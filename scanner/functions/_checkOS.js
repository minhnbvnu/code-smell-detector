function _checkOS () {

        var ua = navigator.userAgent;

        if (/Playstation Vita/.test(ua))
        {
            device.vita = true;
        }
        else if (/Kindle/.test(ua) || /\bKF[A-Z][A-Z]+/.test(ua) || /Silk.*Mobile Safari/.test(ua))
        {
            device.kindle = true;
            // This will NOT detect early generations of Kindle Fire, I think there is no reliable way...
            // E.g. "Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_6_3; en-us; Silk/1.1.0-80) AppleWebKit/533.16 (KHTML, like Gecko) Version/5.0 Safari/533.16 Silk-Accelerated=true"
        }
        else if (/Android/.test(ua))
        {
            device.android = true;
        }
        else if (/CrOS/.test(ua))
        {
            device.chromeOS = true;
        }
        else if (/iP[ao]d|iPhone/i.test(ua))
        {
            device.iOS = true;
            (navigator.appVersion).match(/OS (\d+)/);
            device.iOSVersion = parseInt(RegExp.$1, 10);
        }
        else if (/Linux/.test(ua))
        {
            device.linux = true;
        }
        else if (/Mac OS/.test(ua))
        {
            device.macOS = true;
        }
        else if (/Windows/.test(ua))
        {
            device.windows = true;
        }

        if (/Windows Phone/i.test(ua) || /IEMobile/i.test(ua))
        {
            device.android = false;
            device.iOS = false;
            device.macOS = false;
            device.windows = true;
            device.windowsPhone = true;
        }

        var silk = /Silk/.test(ua); // detected in browsers

        if (device.windows || device.macOS || (device.linux && !silk) || device.chromeOS)
        {
            device.desktop = true;
        }

        //  Windows Phone / Table reset
        if (device.windowsPhone || ((/Windows NT/i.test(ua)) && (/Touch/i.test(ua))))
        {
            device.desktop = false;
        }

    }