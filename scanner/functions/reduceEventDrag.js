function reduceEventDrag(currentDrag, action, sources, calendar) {
        switch (action.type) {
            case 'SET_EVENT_DRAG':
                var newDrag = action.state;
                return {
                    affectedEvents: newDrag.affectedEvents,
                    mutatedEvents: newDrag.mutatedEvents,
                    isEvent: newDrag.isEvent,
                    origSeg: newDrag.origSeg
                };
            case 'UNSET_EVENT_DRAG':
                return null;
            default:
                return currentDrag;
        }
    }