function createDefaultScrollbar (direction, interactive, type) {
        var scrollbar = document.createElement('div'),
            indicator = document.createElement('div');

        if ( type === true ) {
            scrollbar.style.cssText = 'position:absolute;z-index:9999';
            indicator.style.cssText = '-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;position:absolute;background:rgba(0,0,0,0.5);border:1px solid rgba(255,255,255,0.9);border-radius:3px';
        }

        indicator.className = 'iScrollIndicator';

        if ( direction == 'h' ) {
            if ( type === true ) {
                scrollbar.style.cssText += ';height:7px;left:2px;right:2px;bottom:0';
                indicator.style.height = '100%';
            }
            scrollbar.className = 'iScrollHorizontalScrollbar';
        } else {
            if ( type === true ) {
                scrollbar.style.cssText += ';width:7px;bottom:2px;top:2px;right:1px';
                indicator.style.width = '100%';
            }
            scrollbar.className = 'iScrollVerticalScrollbar';
        }

        if ( !interactive ) {
            scrollbar.style.pointerEvents = 'none';
        }

        scrollbar.appendChild(indicator);

        return scrollbar;
    }