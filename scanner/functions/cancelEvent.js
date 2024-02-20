function cancelEvent(event)
    {
        if (document.all)
            event.cancelBubble = true;
        else
            event.stopPropagation();        
    }