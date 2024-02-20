function Menu_Focus(item) {
    if (item && item.focus) {
        var pos = WebForm_GetElementPosition(item);
        var parentContainer = Menu_FindParentContainer(item);
        if (!parentContainer.offset) {
            parentContainer.offset = 0;
        }
        var posParent = WebForm_GetElementPosition(parentContainer);
        var delta;
        if (pos.y + pos.height > posParent.y + parentContainer.offset + parentContainer.clippedHeight) {
            delta = pos.y + pos.height - posParent.y - parentContainer.offset - parentContainer.clippedHeight;
            PopOut_Scroll(parentContainer, delta);
        }
        else if (pos.y < posParent.y + parentContainer.offset) {
            delta = posParent.y + parentContainer.offset - pos.y;
            PopOut_Scroll(parentContainer, -delta);
        }
        PopOut_HideScrollers(parentContainer);
        item.focus();
    }
}