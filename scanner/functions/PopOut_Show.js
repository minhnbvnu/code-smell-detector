function PopOut_Show(panelId, hideScrollers, data) {
    var panel = WebForm_GetElementById(panelId);
    if (panel && panel.tagName.toLowerCase() == "div") {
        panel.style.visibility = "visible";
        panel.style.display = "inline";
        if (!panel.offset || hideScrollers) {
            panel.scrollTop = 0;
            panel.offset = 0;
            var table = WebForm_GetElementByTagName(panel, "TABLE");
            if (table) {
                WebForm_SetElementY(table, 0);
            }
        }
        PopOut_Position(panel, hideScrollers);
        var z = 1;
        var isIE = window.navigator && window.navigator.appName == "Microsoft Internet Explorer" && !window.opera;
        if (isIE && data) {
            var childFrameId = panel.id + "_MenuIFrame";
            var childFrame = WebForm_GetElementById(childFrameId);
            var parent = panel.offsetParent;
            if (!childFrame) {
                childFrame = document.createElement("iframe");
                childFrame.id = childFrameId;
                childFrame.src = (data.iframeUrl ? data.iframeUrl : "about:blank");
                childFrame.style.position = "absolute";
                childFrame.style.display = "none";
                childFrame.scrolling = "no";
                childFrame.frameBorder = "0";
                if (parent.tagName.toLowerCase() == "html") {
                    document.body.appendChild(childFrame);
                }
                else {
                    parent.appendChild(childFrame);
                }
            }
            var pos = WebForm_GetElementPosition(panel);
            var parentPos = WebForm_GetElementPosition(parent);
            WebForm_SetElementX(childFrame, pos.x - parentPos.x);
            WebForm_SetElementY(childFrame, pos.y - parentPos.y);
            WebForm_SetElementWidth(childFrame, pos.width);
            WebForm_SetElementHeight(childFrame, pos.height);
            childFrame.style.display = "block";
            if (panel.currentStyle && panel.currentStyle.zIndex && panel.currentStyle.zIndex != "auto") {
                z = panel.currentStyle.zIndex;
            }
            else if (panel.style.zIndex) {
                z = panel.style.zIndex;
            }
        }
        panel.style.zIndex = z;
    }
}