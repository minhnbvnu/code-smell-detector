function initialize_fullscreen_render() {
        let FullScreenRenderWindowSynchronized = {
            newInstance: window.vtk.macro.newInstance((publicAPI, model, initialValues = {}) => {
                Object.assign(model, DEFAULT_VALUES, initialValues);
                // Object methods
                window.vtk.macro.obj(publicAPI, model);
                window.vtk.macro.get(publicAPI, model, [
                    "renderWindow",
                    "openGLRenderWindow",
                    "interactor",
                    "rootContainer",
                    "container",
                    "controlContainer",
                    "synchronizerContext",
                ]);
                // Object specific methods
                panelFullScreenRenderWindowSynchronized(publicAPI, model);
            }),
        };
        util_1.vtkns.FullScreenRenderWindowSynchronized = FullScreenRenderWindowSynchronized;
    }