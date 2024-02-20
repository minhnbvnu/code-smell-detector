function FunctionWrapper(_args) {
            TimbreObject.call(this, 1, []);
            fn.fixKR(this);

            this.func    = _args[0];
            this._.value = 0;

            if (isDictionary(_args[1])) {
                var params = _args[1];
                this.once("init", function() {
                    this.set(params);
                });
            }
            this.on("setAdd", fn.changeWithValue);
            this.on("setMul", fn.changeWithValue);
        }