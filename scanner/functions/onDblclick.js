function onDblclick(e) {
        clicks = 2;
        if (timer)
            clearTimeout(timer);
        timer = setTimeout(function() {timer = null;}, timeouts[clicks - 1] || 600);
        eventHandler[callbackName]("mousedown", e);
        eventHandler[callbackName](eventNames[clicks], e);
    }