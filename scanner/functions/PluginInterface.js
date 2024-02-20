function PluginInterface () {
    // Holder for all the bound listeners by this module
    this._listeners = {};

    // Event proxies
    this._parent = null;
    this._children = [];
}