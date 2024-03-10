function _checkFeatures () {

        device.canvas = !!window['CanvasRenderingContext2D'] || device.cocoonJS;

        try {
            device.localStorage = !!localStorage.getItem;
        } catch (error) {
            device.localStorage = false;
        }

        device.file = !!window['File'] && !!window['FileReader'] && !!window['FileList'] && !!window['Blob'];
        device.fileSystem = !!window['requestFileSystem'];

        device.webGL = ( function () { try { var canvas = document.createElement( 'canvas' ); /*Force screencanvas to false*/ canvas.screencanvas = false; return !! window.WebGLRenderingContext && ( canvas.getContext( 'webgl' ) || canvas.getContext( 'experimental-webgl' ) ); } catch( e ) { return false; } } )();
        device.webGL = !!device.webGL;

        device.worker = !!window['Worker'];

        device.pointerLock = 'pointerLockElement' in document || 'mozPointerLockElement' in document || 'webkitPointerLockElement' in document;

        device.quirksMode = (document.compatMode === 'CSS1Compat') ? false : true;

        navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia || navigator.oGetUserMedia;

        window.URL = window.URL || window.webkitURL || window.mozURL || window.msURL;

        device.getUserMedia = device.getUserMedia && !!navigator.getUserMedia && !!window.URL;

        // Older versions of firefox (< 21) apparently claim support but user media does not actually work
        if (device.firefox && device.firefoxVersion < 21)
        {
            device.getUserMedia = false;
        }

        // TODO: replace canvasBitBltShift detection with actual feature check

        // Excludes iOS versions as they generally wrap UIWebView (eg. Safari WebKit) and it
        // is safer to not try and use the fast copy-over method.
        if (!device.iOS && (device.ie || device.firefox || device.chrome))
        {
            device.canvasBitBltShift = true;
        }

        // Known not to work
        if (device.safari || device.mobileSafari)
        {
            device.canvasBitBltShift = false;
        }

    }