function getRowHeight(event) {
        var scrubHeight = 274;
        return event.Event.ShowScrub ? eventRowHeight + scrubHeight : eventRowHeight;
    }