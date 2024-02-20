function onDestroy() {
                if (resizeObserver) {
                    resizeObserver.disconnect();
                }
                else {
                    window.removeEventListener('resize', resize);
                }
                element.removeChild(canvas);
            }