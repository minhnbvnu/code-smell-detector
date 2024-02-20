function $deserializeDelta(delta) {
        return {
            action: delta.action,
            start: delta.start,
            end: delta.end,
            lines: delta.lines || [delta.text]
        };
    }