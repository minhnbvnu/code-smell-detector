function AbstractSymbolMap(_name, _parser) {
            this._name = _name;
            this._parser = _parser;
            MapHandler_js_1.MapHandler.register(this);
        }