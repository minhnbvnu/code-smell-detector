function PopOut_Position(panel, hideScrollers) {
    if (window.opera) {
        panel.parentNode.removeChild(panel);
        document.forms[0].appendChild(panel);
    }
    var rel = WebForm_GetElementById(panel.rel);
    var relTable = WebForm_GetElementByTagName(rel, "TABLE");
    var relCoordinates = WebForm_GetElementPosition(relTable ? relTable : rel);
    var panelCoordinates = WebForm_GetElementPosition(panel);
    var panelHeight = ((typeof(panel.physicalHeight) != "undefined") && (panel.physicalHeight != null)) ?
        panel.physicalHeight :
        panelCoordinates.height;
    panel.physicalHeight = panelHeight;
    var panelParentCoordinates;
    if (panel.offsetParent) {
        panelParentCoordinates = WebForm_GetElementPosition(panel.offsetParent);
    }
    else {
        panelParentCoordinates = new Object();
        panelParentCoordinates.x = 0;
        panelParentCoordinates.y = 0;
    }
    var overflowElement = WebForm_GetElementById("__overFlowElement");
    if (!overflowElement) {
        overflowElement = document.createElement("img");
        overflowElement.id="__overFlowElement";
        WebForm_SetElementWidth(overflowElement, 1);
        document.body.appendChild(overflowElement);
    }
    WebForm_SetElementHeight(overflowElement, panelHeight + relCoordinates.y + parseInt(panel.y ? panel.y : 0));
    overflowElement.style.visibility = "visible";
    overflowElement.style.display = "inline";
    var clientHeight = 0;
    var clientWidth = 0;
    if (window.innerHeight) {
        clientHeight = window.innerHeight;
        clientWidth = window.innerWidth;
    }
    else if (document.documentElement && document.documentElement.clientHeight) {
        clientHeight = document.documentElement.clientHeight;
        clientWidth = document.documentElement.clientWidth;
    }
    else if (document.body && document.body.clientHeight) {
        clientHeight = document.body.clientHeight;
        clientWidth = document.body.clientWidth;
    }
    var scrollTop = 0;
    var scrollLeft = 0;
    if (typeof(window.pageYOffset) != "undefined") {
        scrollTop = window.pageYOffset;
        scrollLeft = window.pageXOffset;
    }
    else if (document.documentElement && (typeof(document.documentElement.scrollTop) != "undefined")) {
        scrollTop = document.documentElement.scrollTop;
        scrollLeft = document.documentElement.scrollLeft;
    }
    else if (document.body && (typeof(document.body.scrollTop) != "undefined")) {
        scrollTop = document.body.scrollTop;
        scrollLeft = document.body.scrollLeft;
    }
    overflowElement.style.visibility = "hidden";
    overflowElement.style.display = "none";
    var bottomWindowBorder = clientHeight + scrollTop;
    var rightWindowBorder = clientWidth + scrollLeft;
    var position = panel.pos;
    if ((typeof(position) == "undefined") || (position == null) || (position == "")) {
        position = (WebForm_GetElementDir(rel) == "rtl" ? "middleleft" : "middleright");
    }
    position = position.toLowerCase();
    var y = relCoordinates.y + parseInt(panel.y ? panel.y : 0) - panelParentCoordinates.y;
    var borderParent = (rel && rel.parentNode && rel.parentNode.parentNode && rel.parentNode.parentNode.parentNode
        && rel.parentNode.parentNode.parentNode.tagName.toLowerCase() == "div") ?
        rel.parentNode.parentNode.parentNode : null;
    WebForm_SetElementY(panel, y);
    PopOut_SetPanelHeight(panel, panelHeight, true);
    var clip = false;
    var overflow;
    if (position.indexOf("top") != -1) {
        y -= panelHeight;
        WebForm_SetElementY(panel, y); 
        if (y < -panelParentCoordinates.y) {
            y = -panelParentCoordinates.y;
            WebForm_SetElementY(panel, y); 
            if (panelHeight > clientHeight - 2) {
                clip = true;
                PopOut_SetPanelHeight(panel, clientHeight - 2);
            }
        }
    }
    else {
        if (position.indexOf("bottom") != -1) {
            y += relCoordinates.height;
            WebForm_SetElementY(panel, y); 
        }
        overflow = y + panelParentCoordinates.y + panelHeight - bottomWindowBorder;
        if (overflow > 0) {
            y -= overflow;
            WebForm_SetElementY(panel, y); 
            if (y < -panelParentCoordinates.y) {
                y = 2 - panelParentCoordinates.y + scrollTop;
                WebForm_SetElementY(panel, y); 
                clip = true;
                PopOut_SetPanelHeight(panel, clientHeight - 2);
            }
        }
    }
    if (!clip) {
        PopOut_SetPanelHeight(panel, panel.clippedHeight, true);
    }
    var panelParentOffsetY = 0;
    if (panel.offsetParent) {
        panelParentOffsetY = WebForm_GetElementPosition(panel.offsetParent).y;
    }
    var panelY = ((typeof(panel.originY) != "undefined") && (panel.originY != null)) ?
        panel.originY :
        y - panelParentOffsetY;
    panel.originY = panelY;
    if (!hideScrollers) {
        PopOut_ShowScrollers(panel);
    }
    else {
        PopOut_HideScrollers(panel);
    }
    var x = relCoordinates.x + parseInt(panel.x ? panel.x : 0) - panelParentCoordinates.x;
    if (borderParent && borderParent.clientLeft) {
        x += 2 * borderParent.clientLeft;
    }
    WebForm_SetElementX(panel, x);
    if (position.indexOf("left") != -1) {
        x -= panelCoordinates.width;
        WebForm_SetElementX(panel, x);
        if (x < -panelParentCoordinates.x) {
            WebForm_SetElementX(panel, -panelParentCoordinates.x);
        }
    }
    else {
        if (position.indexOf("right") != -1) {
            x += relCoordinates.width;
            WebForm_SetElementX(panel, x);
        }
        overflow = x + panelParentCoordinates.x + panelCoordinates.width - rightWindowBorder;
        if (overflow > 0) {
            if (position.indexOf("bottom") == -1 && relCoordinates.x > panelCoordinates.width) {
                x -= relCoordinates.width + panelCoordinates.width;
            }
            else {
                x -= overflow;
            }
            WebForm_SetElementX(panel, x);
            if (x < -panelParentCoordinates.x) {
                WebForm_SetElementX(panel, -panelParentCoordinates.x);
            }
        }
    }
}