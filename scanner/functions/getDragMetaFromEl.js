function getDragMetaFromEl(el) {
        var str = getEmbeddedElData(el, 'event');
        var obj = str ?
            JSON.parse(str) :
            { create: false }; // if no embedded data, assume no event creation
        return core.parseDragMeta(obj);
    }