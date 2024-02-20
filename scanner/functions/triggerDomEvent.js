function triggerDomEvent(event, data) {
            var gestureEvent = document.createEvent('Event');
            gestureEvent.initEvent(event, true, true);
            gestureEvent.gesture = data;
            data.target.dispatchEvent(gestureEvent);
        }