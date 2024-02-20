function reduceEventResize(currentResize, action, sources, calendar) {
        switch (action.type) {
            case 'SET_EVENT_RESIZE':
                var newResize = action.state;
                return {
                    affectedEvents: newResize.affectedEvents,
                    mutatedEvents: newResize.mutatedEvents,
                    isEvent: newResize.isEvent,
                    origSeg: newResize.origSeg
                };
            case 'UNSET_EVENT_RESIZE':
                return null;
            default:
                return currentResize;
        }
    }