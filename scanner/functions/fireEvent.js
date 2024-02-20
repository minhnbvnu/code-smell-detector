function fireEvent(name, value) {
        if(!that.enableCustomEvents)
            return;
        if(doc.createEvent) {
            var evObj = doc.createEvent('Events');
            evObj.initEvent('sjs' + name, true, true);
            evObj.value = value;
            that.dom.dispatchEvent(evObj);
        } else if(doc.createEventObject) {
            var evObj = doc.createEventObject();
            evObj.value = value;
            that.dom.fireEvent('onsjs' + name, evObj);
        }
    }