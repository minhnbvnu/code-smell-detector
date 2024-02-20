function resolveWhenDrawn() {
        view.removeFrameRequester(itowns.MAIN_LOOP_EVENTS.AFTER_RENDER, resolveWhenDrawn);

        // make sure the loading screen is hidden
        const container = document.getElementById('itowns-loader');
        if (container) {
            container.style.display = 'none';
        }
        const divScaleWidget = document.querySelectorAll('.divScaleWidget');
        if (divScaleWidget && divScaleWidget.length) {
            divScaleWidget[0].style.display = 'none';
        }

        resolve();
    }