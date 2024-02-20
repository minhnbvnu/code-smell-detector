function destroyContextMenu() {
    var id = this.rootElement[0].id;
    $.contextMenu('destroy', "#" + id + ' table, #' + id + ' div');

    /*
     * There is a bug in $.contextMenu: 'destroy' does not remove layer when selector is provided. When the below line
     * is removed, running the context menu tests in Jasmine will produce invisible layers that are never removed from DOM
     */
    $(document.querySelectorAll('#context-menu-layer')).remove();
  }