function addOffset(elt, coords, view)
    {
        var p = elt.offsetParent;

        var style = view.getComputedStyle(elt, "");

        if (elt.offsetLeft)
            coords.x += elt.offsetLeft + parseInt(style.borderLeftWidth, 10);
        if (elt.offsetTop)
            coords.y += elt.offsetTop + parseInt(style.borderTopWidth, 10);

        if (p)
        {
            if (p.nodeType === 1)
                addOffset(p, coords, view);
        }
        else if (elt.ownerDocument.defaultView.frameElement)
        {
            addOffset(elt.ownerDocument.defaultView.frameElement,
                coords, elt.ownerDocument.defaultView);
        }
    }