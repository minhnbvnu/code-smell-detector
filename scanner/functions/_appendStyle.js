function _appendStyle() {
        var doc = document,
            head = doc.getElementsByTagName('head')[0],
            style = doc.createElement('style'),
            cssText = '.scale{visibility:hidden;cursor:move;position:absolute;left:0;top:0;width:100px;height:50px;background-color:#fff;font-size:0;line-height:0;opacity:.4;filter:Alpha(opacity=40);}'
                + '.scale span{position:absolute;left:0;top:0;width:6px;height:6px;background-color:#006DAE;}'
                + '.scale .hand0, .scale .hand7{cursor:nw-resize;}'
                + '.scale .hand1, .scale .hand6{left:50%;margin-left:-3px;cursor:n-resize;}'
                + '.scale .hand2, .scale .hand4, .scale .hand7{left:100%;margin-left:-6px;}'
                + '.scale .hand3, .scale .hand4{top:50%;margin-top:-3px;cursor:w-resize;}'
                + '.scale .hand5, .scale .hand6, .scale .hand7{margin-top:-6px;top:100%;}'
                + '.scale .hand2, .scale .hand5{cursor:ne-resize;}';
        style.type = 'text/css';

        try {
            style.appendChild(doc.createTextNode(cssText));
        } catch (e) {
            style.styleSheet.cssText = cssText;
        }
        head.appendChild(style);
    }