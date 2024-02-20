function Macro(_symbol, _func, _args) {
            if (_args === void 0) {
                _args = [];
            }
            this._symbol = _symbol;
            this._func = _func;
            this._args = _args;
        }