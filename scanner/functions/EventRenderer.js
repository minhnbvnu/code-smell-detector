function EventRenderer(component, fillRenderer) {
        this.view = component._getView();
        this.component = component;
        this.fillRenderer = fillRenderer;
    }