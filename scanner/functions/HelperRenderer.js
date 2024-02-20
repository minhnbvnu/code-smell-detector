function HelperRenderer(component, eventRenderer) {
        this.view = component._getView();
        this.component = component;
        this.eventRenderer = eventRenderer;
    }