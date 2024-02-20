function WebPartManager_IsDragDropEnabled() {
    return ((typeof(this.overlayContainerElement) != "undefined") && (this.overlayContainerElement != null));
}