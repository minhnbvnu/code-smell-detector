function GuiTools(domId, view, w) {
    if (view) {
        const width = w || 245;
        const element = document.createElement('div');
        element.id = 'menuDiv';
        this.gui = new dat.GUI({ autoPlace: false, width: width });
        element.appendChild(this.gui.domElement);
        document.body.appendChild(element);
        this.colorGui = this.gui.addFolder('Color Layers');
        this.elevationGui = this.gui.addFolder('Elevation Layers');
        this.geoidGui = this.gui.addFolder('Geoid Layers');
        this.elevationGui.hide();
        this.colorGui.hide();
        this.geoidGui.hide();
        this.view = view;
        view.addEventListener('layers-order-changed', (function refreshColorGui() {
            let i;
            const colorLayers = view.getLayers(function filter(l) { return l.isColorLayer; });
            for (i = 0; i < colorLayers.length; i++) {
                this.removeLayersGUI(colorLayers[i].id);
            }

            this.addImageryLayersGUI(colorLayers);
        }).bind(this));
    }
}