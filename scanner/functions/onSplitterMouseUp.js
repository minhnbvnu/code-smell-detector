function onSplitterMouseUp(event)
    {
        removeEvent(document, "mousemove", onSplitterMouseMove);
        removeEvent(document, "mouseup", onSplitterMouseUp);

        for (var i = 0; i < frames.length; ++i)
        {
            removeEvent(frames[i].document, "mousemove", onSplitterMouseMove);
            removeEvent(frames[i].document, "mouseup", onSplitterMouseUp);
        }
    }