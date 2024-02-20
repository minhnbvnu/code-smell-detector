function deleteProp(propName) {
    var descriptor = Object.getOwnPropertyDescriptor(this, propName);
    if (!descriptor) {
        return false; // own property not found
    } else if (!descriptor.get) {
        return delete this[propName]; // non-accessor property found (returns !descriptor.configurable)
    } else if (descriptor.get.toString().indexOf('.var.')) {
        this.var[propName] = Object.getPrototypeOf(this)[propName];
    } else {
        return true; // property not deletable
    }
    this.grid.repaint();
    return false; // delete was successful
}