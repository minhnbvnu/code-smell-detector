function parseAttribLocations(options, attributes) {
                var staticOptions = options.static;
                var staticProgram = typeof staticOptions[S_FRAG] === 'string' &&
                    typeof staticOptions[S_VERT] === 'string';
                if (staticProgram) {
                    if (Object.keys(attributes.dynamic).length > 0) {
                        return null;
                    }
                    var staticAttributes = attributes.static;
                    var sAttributes = Object.keys(staticAttributes);
                    if (sAttributes.length > 0 && typeof staticAttributes[sAttributes[0]] === 'number') {
                        var bindings = [];
                        for (var i = 0; i < sAttributes.length; ++i) {
                            check$1(typeof staticAttributes[sAttributes[i]] === 'number', 'must specify all vertex attribute locations when using vaos');
                            bindings.push([staticAttributes[sAttributes[i]] | 0, sAttributes[i]]);
                        }
                        return bindings;
                    }
                }
                return null;
            }