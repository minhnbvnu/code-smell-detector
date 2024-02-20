function onMouseOut(e) {
            if (crosshair.locked)
                return;

            if (crosshair.x != -1) {
                crosshair.x = -1;
                plot.triggerRedrawOverlay();
            }
        }