function emitDrawProc(env, args) {
                var draw = env.proc('draw', 1);
                injectExtensions(env, draw);
                emitContext(env, draw, args.context);
                emitPollFramebuffer(env, draw, args.framebuffer);
                emitPollState(env, draw, args);
                emitSetOptions(env, draw, args.state);
                emitProfile(env, draw, args, false, true);
                var program = args.shader.progVar.append(env, draw);
                draw(env.shared.gl, '.useProgram(', program, '.program);');
                if (args.shader.program) {
                    emitDrawBody(env, draw, args, args.shader.program);
                }
                else {
                    draw(env.shared.vao, '.setVAO(null);');
                    var drawCache = env.global.def('{}');
                    var PROG_ID = draw.def(program, '.id');
                    var CACHED_PROC = draw.def(drawCache, '[', PROG_ID, ']');
                    draw(env.cond(CACHED_PROC)
                        .then(CACHED_PROC, '.call(this,a0);')
                        .else(CACHED_PROC, '=', drawCache, '[', PROG_ID, ']=', env.link(function (program) {
                        return createBody(emitDrawBody, env, args, program, 1);
                    }), '(', program, ');', CACHED_PROC, '.call(this,a0);'));
                }
                if (Object.keys(args.state).length > 0) {
                    draw(env.shared.current, '.dirty=true;');
                }
                if (env.shared.vao) {
                    draw(env.shared.vao, '.setVAO(null);');
                }
            }