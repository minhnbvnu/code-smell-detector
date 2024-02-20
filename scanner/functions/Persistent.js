function Persistent(inOn) {
        gStartDate = new Date();
        var event;
        if (inOn) {
            event = new CSEvent("com.adobe.PhotoshopPersistent", "APPLICATION");
        } else {
            event = new CSEvent("com.adobe.PhotoshopUnPersistent", "APPLICATION");
        }
        event.extensionId = gExtensionID;
        csInterface.dispatchEvent(event);
        SetResultTime();
    }