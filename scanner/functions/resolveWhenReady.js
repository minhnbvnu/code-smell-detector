function resolveWhenReady() {
            if (view.mainLoop.renderingState === 0) {
                view.mainLoop.removeEventListener('command-queue-empty', resolveWhenReady);
                itowns.CameraUtils.stop(view, view.camera3D);
                resolve(true);
            }
        }