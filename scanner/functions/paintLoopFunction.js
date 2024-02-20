function paintLoopFunction(now) {
    if (paintRequest) {
        paintables.forEach(function(paintable) {
            try {
                paintable.tickPainter(now);
            } catch (e) {
                console.error(e);
            }

            if (paintable.component.tickNotification) {
                paintable.component.tickNotification();
            }
        });
        paintRequest = requestAnimationFrame(paintLoopFunction);
    }
}