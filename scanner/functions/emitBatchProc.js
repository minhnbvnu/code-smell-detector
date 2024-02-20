function emitBatchProc(env, args) {
                var batch = env.proc('batch', 2);
                env.batchId = '0';
                injectExtensions(env, batch);
                // Check if any context variables depend on props
                var contextDynamic = false;
                var needsContext = true;
                Object.keys(args.context).forEach(function (name) {
                    contextDynamic = contextDynamic || args.context[name].propDep;
                });
                if (!contextDynamic) {
                    emitContext(env, batch, args.context);
                    needsContext = false;
                }
                // framebuffer state affects framebufferWidth/height context vars
                var framebuffer = args.framebuffer;
                var needsFramebuffer = false;
                if (framebuffer) {
                    if (framebuffer.propDep) {
                        contextDynamic = needsFramebuffer = true;
                    }
                    else if (framebuffer.contextDep && contextDynamic) {
                        needsFramebuffer = true;
                    }
                    if (!needsFramebuffer) {
                        emitPollFramebuffer(env, batch, framebuffer);
                    }
                }
                else {
                    emitPollFramebuffer(env, batch, null);
                }
                // viewport is weird because it can affect context vars
                if (args.state.viewport && args.state.viewport.propDep) {
                    contextDynamic = true;
                }
                function isInnerDefn(defn) {
                    return (defn.contextDep && contextDynamic) || defn.propDep;
                }
                // set webgl options
                emitPollState(env, batch, args);
                emitSetOptions(env, batch, args.state, function (defn) {
                    return !isInnerDefn(defn);
                });
                if (!args.profile || !isInnerDefn(args.profile)) {
                    emitProfile(env, batch, args, false, 'a1');
                }
                // Save these values to args so that the batch body routine can use them
                args.contextDep = contextDynamic;
                args.needsContext = needsContext;
                args.needsFramebuffer = needsFramebuffer;
                // determine if shader is dynamic
                var progDefn = args.shader.progVar;
                if ((progDefn.contextDep && contextDynamic) || progDefn.propDep) {
                    emitBatchBody(env, batch, args, null);
                }
                else {
                    var PROGRAM = progDefn.append(env, batch);
                    batch(env.shared.gl, '.useProgram(', PROGRAM, '.program);');
                    if (args.shader.program) {
                        emitBatchBody(env, batch, args, args.shader.program);
                    }
                    else {
                        batch(env.shared.vao, '.setVAO(null);');
                        var batchCache = env.global.def('{}');
                        var PROG_ID = batch.def(PROGRAM, '.id');
                        var CACHED_PROC = batch.def(batchCache, '[', PROG_ID, ']');
                        batch(env.cond(CACHED_PROC)
                            .then(CACHED_PROC, '.call(this,a0,a1);')
                            .else(CACHED_PROC, '=', batchCache, '[', PROG_ID, ']=', env.link(function (program) {
                            return createBody(emitBatchBody, env, args, program, 2);
                        }), '(', PROGRAM, ');', CACHED_PROC, '.call(this,a0,a1);'));
                    }
                }
                if (Object.keys(args.state).length > 0) {
                    batch(env.shared.current, '.dirty=true;');
                }
                if (env.shared.vao) {
                    batch(env.shared.vao, '.setVAO(null);');
                }
            }