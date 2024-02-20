function getFlashPlayerVersion(subs) {
            /*global ActiveXObject:true */
            try {
                if (nav.plugins && nav.mimeTypes && nav.mimeTypes.length) {
                    return nav.plugins["Shockwave Flash"].description.match(/([0-9]+)/)[subs];
                }
                return (new ActiveXObject("ShockwaveFlash.ShockwaveFlash")).GetVariable("$version").match(/([0-9]+)/)[subs];
            } catch (e) {
                return -1;
            }
            /*global ActiveXObject:false */
        }