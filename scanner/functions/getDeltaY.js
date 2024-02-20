function getDeltaY(event) {
        let deltaY = -event.deltaY;
        if (event.target instanceof HTMLElement) {
            switch (event.deltaMode) {
                case event.DOM_DELTA_LINE:
                    deltaY *= lineHeight(event.target);
                    break;
                case event.DOM_DELTA_PAGE:
                    deltaY *= pageHeight(event.target);
                    break;
            }
        }
        return deltaY;
    }