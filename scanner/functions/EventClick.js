function EventClick(inCheckbox) {
        try {
            var uiItem = null;
            var eventID = 0;
            if (inCheckbox === cbMake) {
                uiItem = cbMake;
                eventID = eventMake;
            } else if (inCheckbox === cbDelete) {
                uiItem = cbDelete;
                eventID = eventDelete;
            } else if (inCheckbox === cbClose) {
                uiItem = cbClose;
                eventID = eventClose;
            } else if (inCheckbox === cbSelect) {
                uiItem = cbSelect;
                eventID = eventSelect;
            } else if (inCheckbox === cbSet) {
                uiItem = cbSet;
                eventID = eventSet;
            }
            if (uiItem !== null) {
                Register(uiItem.checked, eventID.toString());
            }
            // TODO remove or add the event into the gRegisteredEvents array
        }
        catch (e) {
            JSLogIt("EventClick catch:" + e);
        }
    }