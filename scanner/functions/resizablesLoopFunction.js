function resizablesLoopFunction(now) {
    if (resizeInterval) {
        for (var i = 0; i < resizables.length; i++) {
            try {
                resizables[i].tickResizer(now);
            } catch (e) {
                console.error(e);
            }
        }
    }
}