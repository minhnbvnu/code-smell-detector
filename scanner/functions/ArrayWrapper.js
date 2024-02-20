function ArrayWrapper(_args) {
            TimbreObject.call(this, 1, []);

            var i, imax;
            for (i = 0, imax = _args[0].length; i < imax; ++i) {
              this.append(_args[0][i]);
            }

            if (isDictionary(_args[1])) {
                var params = _args[1];
                this.once("init", function() {
                    this.set(params);
                });
            }
        }