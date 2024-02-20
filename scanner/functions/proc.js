function proc(name, count) {
                var args = [];
                function arg() {
                    var name = 'a' + args.length;
                    args.push(name);
                    return name;
                }
                count = count || 0;
                for (var i = 0; i < count; ++i) {
                    arg();
                }
                var body = scope();
                var bodyToString = body.toString;
                var result = procedures[name] = extend(body, {
                    arg: arg,
                    toString: function () {
                        return join([
                            'function(', args.join(), '){',
                            bodyToString(),
                            '}'
                        ]);
                    }
                });
                return result;
            }