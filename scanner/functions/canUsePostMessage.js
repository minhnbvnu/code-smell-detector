function canUsePostMessage() {
        // The test against `importScripts` prevents this implementation from being installed inside a web worker,
        // where `global.postMessage` means something completely different and can't be used for this purpose.
        if (global.postMessage && !global.importScripts) {
            var postMessageIsAsynchronous = true;

            var onMessage = function() {
                postMessageIsAsynchronous = false;
                if (global.removeEventListener) {
                    global.removeEventListener("message", onMessage, false);
                } else {
                    global.detachEvent("onmessage", onMessage);
                }
            };

            if (global.addEventListener) {
                global.addEventListener("message", onMessage, false);
            } else if (global.attachEvent) {
                global.attachEvent("onmessage", onMessage);
            } else {
                return false;
            }

            global.postMessage("", "*");
            return postMessageIsAsynchronous;
        }
    }