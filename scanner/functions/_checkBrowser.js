function _checkBrowser () {

        var ua = navigator.userAgent;

        if (/Arora/.test(ua))
        {
            device.arora = true;
        }
        else if (/Edge\/\d+/.test(ua))
        {
            device.edge = true;
        }
        else if (/Chrome\/(\d+)/.test(ua) && !device.windowsPhone)
        {
            device.chrome = true;
            device.chromeVersion = parseInt(RegExp.$1, 10);
        }
        else if (/Epiphany/.test(ua))
        {
            device.epiphany = true;
        }
        else if (/Firefox\D+(\d+)/.test(ua))
        {
            device.firefox = true;
            device.firefoxVersion = parseInt(RegExp.$1, 10);
        }
        else if (/AppleWebKit/.test(ua) && device.iOS)
        {
            device.mobileSafari = true;
        }
        else if (/MSIE (\d+\.\d+);/.test(ua))
        {
            device.ie = true;
            device.ieVersion = parseInt(RegExp.$1, 10);
        }
        else if (/Midori/.test(ua))
        {
            device.midori = true;
        }
        else if (/Opera/.test(ua))
        {
            device.opera = true;
        }
        else if (/Safari\/(\d+)/.test(ua) && !device.windowsPhone)
        {
            device.safari = true;

            if (/Version\/(\d+)\./.test(ua))
            {
                device.safariVersion = parseInt(RegExp.$1, 10);
            }
        }
        else if (/Trident\/(\d+\.\d+)(.*)rv:(\d+\.\d+)/.test(ua))
        {
            device.ie = true;
            device.trident = true;
            device.tridentVersion = parseInt(RegExp.$1, 10);
            device.ieVersion = parseInt(RegExp.$3, 10);
        }

        //  Silk gets its own if clause because its ua also contains 'Safari'
        if (/Silk/.test(ua))
        {
            device.silk = true;
        }

        //  WebApp mode in iOS
        if (navigator['standalone'])
        {
            device.webApp = true;
        }
        
        if (typeof window.cordova !== 'undefined')
        {
            device.cordova = true;
        }
        
        if (typeof process !== 'undefined' && typeof require !== 'undefined')
        {
            device.node = true;
        }
        
        if (device.node && typeof process.versions === 'object')
        {
            device.nodeWebkit = !!process.versions['node-webkit'];
            
            device.electron = !!process.versions.electron;
        }
        
        if (navigator['isCocoonJS'])
        {
            device.cocoonJS = true;
        }
        
        if (device.cocoonJS)
        {
            try {
                device.cocoonJSApp = (typeof CocoonJS !== 'undefined');
            }
            catch(error)
            {
                device.cocoonJSApp = false;
            }
        }

        if (typeof window.ejecta !== 'undefined')
        {
            device.ejecta = true;
        }

        if (/Crosswalk/.test(ua))
        {
            device.crosswalk = true;
        }

    }