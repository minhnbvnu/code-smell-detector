function mouseCoords(evt) {
        if (evt.pageX || evt.pageY) {
            return { x:evt.pageX, y:evt.pageY };
        }
        return {
            x:evt.clientX + me.document.body.scrollLeft - me.document.body.clientLeft,
            y:evt.clientY + me.document.body.scrollTop - me.document.body.clientTop
        };
    }