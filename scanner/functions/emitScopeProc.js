function emitScopeProc(env, args) {
                var scope = env.proc('scope', 3);
                env.batchId = 'a2';
                var shared = env.shared;
                var CURRENT_STATE = shared.current;
                emitContext(env, scope, args.context);
                if (args.framebuffer) {
                    args.framebuffer.append(env, scope);
                }
                sortState(Object.keys(args.state)).forEach(function (name) {
                    var defn = args.state[name];
                    var value = defn.append(env, scope);
                    if (isArrayLike(value)) {
                        value.forEach(function (v, i) {
                            scope.set(env.next[name], '[' + i + ']', v);
                        });
                    }
                    else {
                        scope.set(shared.next, '.' + name, value);
                    }
                });
                emitProfile(env, scope, args, true, true);
                [S_ELEMENTS, S_OFFSET, S_COUNT, S_INSTANCES, S_PRIMITIVE].forEach(function (opt) {
                    var variable = args.draw[opt];
                    if (!variable) {
                        return;
                    }
                    scope.set(shared.draw, '.' + opt, '' + variable.append(env, scope));
                });
                Object.keys(args.uniforms).forEach(function (opt) {
                    var value = args.uniforms[opt].append(env, scope);
                    if (Array.isArray(value)) {
                        value = '[' + value.join() + ']';
                    }
                    scope.set(shared.uniforms, '[' + stringStore.id(opt) + ']', value);
                });
                Object.keys(args.attributes).forEach(function (name) {
                    var record = args.attributes[name].append(env, scope);
                    var scopeAttrib = env.scopeAttrib(name);
                    Object.keys(new AttributeRecord()).forEach(function (prop) {
                        scope.set(scopeAttrib, '.' + prop, record[prop]);
                    });
                });
                if (args.scopeVAO) {
                    scope.set(shared.vao, '.targetVAO', args.scopeVAO.append(env, scope));
                }
                function saveShader(name) {
                    var shader = args.shader[name];
                    if (shader) {
                        scope.set(shared.shader, '.' + name, shader.append(env, scope));
                    }
                }
                saveShader(S_VERT);
                saveShader(S_FRAG);
                if (Object.keys(args.state).length > 0) {
                    scope(CURRENT_STATE, '.dirty=true;');
                    scope.exit(CURRENT_STATE, '.dirty=true;');
                }
                scope('a1(', env.shared.context, ',a0,', env.batchId, ');');
            }