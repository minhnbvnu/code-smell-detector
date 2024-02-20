function saveShader(name) {
                    var shader = args.shader[name];
                    if (shader) {
                        scope.set(shared.shader, '.' + name, shader.append(env, scope));
                    }
                }