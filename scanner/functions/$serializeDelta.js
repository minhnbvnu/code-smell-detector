function $serializeDelta(delta){
        return {
            action: delta.action,
            start: delta.start,
            end: delta.end,
            lines: delta.lines.length == 1 ? null : delta.lines,
            text: delta.lines.length == 1 ? delta.lines[0] : null
        };
    }