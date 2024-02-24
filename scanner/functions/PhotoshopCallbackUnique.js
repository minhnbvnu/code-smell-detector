function PhotoshopCallbackUnique(csEvent) {
        try {
            if (typeof csEvent.data === "string") {
                var eventData = csEvent.data.replace("ver1,{", "{");
                var eventDataParse = JSON.parse(eventData);
                var jsonStringBack = JSON.stringify(eventDataParse);
                SetResultLabel("PhotoshopCallbackUnique: " + jsonStringBack);
                JSLogIt("PhotoshopCallbackUnique: " + jsonStringBack);

                var uiItemToUpdate = null;
                if (eventDataParse.eventID === eventMake)
                    uiItemToUpdate = lblMake;
                else if (eventDataParse.eventID === eventDelete)
                    uiItemToUpdate = lblDelete;
                else if (eventDataParse.eventID === eventClose)
                    uiItemToUpdate = lblClose;
                else if (eventDataParse.eventID === eventSelect)
                    uiItemToUpdate = lblSelect;
                else if (eventDataParse.eventID === eventSet)
                    uiItemToUpdate = lblSet;

                if (uiItemToUpdate !== null) {
                    var count = Number(uiItemToUpdate.innerHTML) + 1;
                    uiItemToUpdate.innerHTML = " " + count;
                }

                // if you just made a text layer, let me check my object for something
                // interesting to dump to log
                if (eventDataParse &&
                    eventDataParse.eventData.null &&
                    eventDataParse.eventData.null._ref &&
                    eventDataParse.eventData.null._ref === "textLayer") {
                    JSLogIt("Got a text layer, trying to find paragraphStyleRange");
                    if (eventDataParse.eventData.using &&
                        eventDataParse.eventData.using.paragraphStyleRange) {
                        JSLogIt("paragraphStyleRange:" + eventDataParse.eventData.using.paragraphStyleRange);
                        JSLogIt("paragraphStyleRange typeof :" + typeof eventDataParse.eventData.using.paragraphStyleRange);
                        JSLogIt("paragraphStyleRange[0].from: " + eventDataParse.eventData.using.paragraphStyleRange[0].from);
                    }
                }
            } else {
                JSLogIt("PhotoshopCallbackUnique expecting string for csEvent.data!");
            }
        } catch (e) {
            JSLogIt("PhotoshopCallbackUnique catch:" + e);
        }
    }