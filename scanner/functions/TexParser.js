function TexParser(_string, env, configuration) {
            var e_1, _a;
            this._string = _string;
            this.configuration = configuration;
            this.macroCount = 0;
            this.i = 0;
            this.currentCS = '';
            var inner = env.hasOwnProperty('isInner');
            var isInner = env['isInner'];
            delete env['isInner'];
            var ENV;
            if (env) {
                ENV = {};
                try {
                    for (var _b = __values(Object.keys(env)), _c = _b.next(); !_c.done; _c = _b.next()) {
                        var id = _c.value;
                        ENV[id] = env[id];
                    }
                }
                catch (e_1_1) {
                    e_1 = { error: e_1_1 };
                }
                finally {
                    try {
                        if (_c && !_c.done && (_a = _b.return))
                            _a.call(_b);
                    }
                    finally {
                        if (e_1)
                            throw e_1.error;
                    }
                }
            }
            this.configuration.pushParser(this);
            this.stack = new Stack_js_1.default(this.itemFactory, ENV, inner ? isInner : true);
            this.Parse();
            this.Push(this.itemFactory.create('stop'));
        }