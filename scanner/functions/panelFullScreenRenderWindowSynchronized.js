function panelFullScreenRenderWindowSynchronized(publicAPI, model) {
        // Panel (modification) synchronizable renderWindow
        model.renderWindow = util_1.vtkns.SynchronizableRenderWindow.newInstance({
            synchronizerContext: model.synchronizerContext,
        });
        // OpenGlRenderWindow
        model.openGLRenderWindow = util_1.vtkns.OpenGLRenderWindow.newInstance();
        model.openGLRenderWindow.setContainer(model.container);
        model.renderWindow.addView(model.openGLRenderWindow);
        // Interactor
        model.interactor = util_1.vtkns.RenderWindowInteractor.newInstance();
        model.interactor.setInteractorStyle(util_1.vtkns.InteractorStyleTrackballCamera.newInstance());
        model.interactor.setView(model.openGLRenderWindow);
        model.interactor.initialize();
        model.interactor.bindEvents(model.container);
        publicAPI.getRenderer = () => model.renderWindow.getRenderers()[0];
        publicAPI.removeController = () => {
            const el = model.controlContainer;
            if (el) {
                el.parentNode.removeChild(el);
            }
        };
        publicAPI.setControllerVisibility = (visible) => {
            model.controllerVisibility = visible;
            if (model.controlContainer) {
                if (visible) {
                    model.controlContainer.style.display = "block";
                }
                else {
                    model.controlContainer.style.display = "none";
                }
            }
        };
        publicAPI.toggleControllerVisibility = () => {
            publicAPI.setControllerVisibility(!model.controllerVisibility);
        };
        publicAPI.addController = (html) => {
            model.controlContainer = document.createElement("div");
            (0, util_1.applyStyle)(model.controlContainer, model.controlPanelStyle || STYLE_CONTROL_PANEL);
            model.rootContainer.appendChild(model.controlContainer);
            model.controlContainer.innerHTML = html;
            publicAPI.setControllerVisibility(model.controllerVisibility);
            model.rootContainer.addEventListener("keypress", (e) => {
                if (String.fromCharCode(e.charCode) === "c") {
                    publicAPI.toggleControllerVisibility();
                }
            });
        };
        // Properly release GL context
        publicAPI.delete = window.vtk.macro.chain(publicAPI.setContainer, model.openGLRenderWindow.delete, publicAPI.delete);
        // Handle window resize
        publicAPI.resize = () => {
            const dims = model.container.getBoundingClientRect();
            const devicePixelRatio = window.devicePixelRatio || 1;
            model.openGLRenderWindow.setSize(Math.floor(dims.width * devicePixelRatio), Math.floor(dims.height * devicePixelRatio));
            if (model.resizeCallback) {
                model.resizeCallback(dims);
            }
            model.renderWindow.render();
        };
        publicAPI.setResizeCallback = (cb) => {
            model.resizeCallback = cb;
            publicAPI.resize();
        };
        if (model.listenWindowResize) {
            window.addEventListener("resize", publicAPI.resize);
        }
        publicAPI.resize();
    }