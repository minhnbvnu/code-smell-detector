function WebPartManager_Execute(script) {
    if (this.menu) {
        this.menu.Hide();
    }
    var scriptReference = new Function(script);
    return (scriptReference() != false);
}