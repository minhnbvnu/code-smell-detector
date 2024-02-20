function emitBatchBody(env, scope, args, program) {
                injectExtensions(env, scope);
                var contextDynamic = args.contextDep;
                var BATCH_ID = scope.def();
                var PROP_LIST = 'a0';
                var NUM_PROPS = 'a1';
                var PROPS = scope.def();
                env.shared.props = PROPS;
                env.batchId = BATCH_ID;
                var outer = env.scope();
                var inner = env.scope();
                scope(outer.entry, 'for(', BATCH_ID, '=0;', BATCH_ID, '<', NUM_PROPS, ';++', BATCH_ID, '){', PROPS, '=', PROP_LIST, '[', BATCH_ID, '];', inner, '}', outer.exit);
                function isInnerDefn(defn) {
                    return ((defn.contextDep && contextDynamic) || defn.propDep);
                }
                function isOuterDefn(defn) {
                    return !isInnerDefn(defn);
                }
                if (args.needsContext) {
                    emitContext(env, inner, args.context);
                }
                if (args.needsFramebuffer) {
                    emitPollFramebuffer(env, inner, args.framebuffer);
                }
                emitSetOptions(env, inner, args.state, isInnerDefn);
                if (args.profile && isInnerDefn(args.profile)) {
                    emitProfile(env, inner, args, false, true);
                }
                if (!program) {
                    var progCache = env.global.def('{}');
                    var PROGRAM = args.shader.progVar.append(env, inner);
                    var PROG_ID = inner.def(PROGRAM, '.id');
                    var CACHED_PROC = inner.def(progCache, '[', PROG_ID, ']');
                    inner(env.shared.gl, '.useProgram(', PROGRAM, '.program);', 'if(!', CACHED_PROC, '){', CACHED_PROC, '=', progCache, '[', PROG_ID, ']=', env.link(function (program) {
                        return createBody(emitBatchDynamicShaderBody, env, args, program, 2);
                    }), '(', PROGRAM, ');}', CACHED_PROC, '.call(this,a0[', BATCH_ID, '],', BATCH_ID, ');');
                }
                else {
                    if (args.useVAO) {
                        if (args.drawVAO) {
                            if (isInnerDefn(args.drawVAO)) {
                                // vao is a prop
                                inner(env.shared.vao, '.setVAO(', args.drawVAO.append(env, inner), ');');
                            }
                            else {
                                // vao is invariant
                                outer(env.shared.vao, '.setVAO(', args.drawVAO.append(env, outer), ');');
                            }
                        }
                        else {
                            // scoped vao binding
                            outer(env.shared.vao, '.setVAO(', env.shared.vao, '.targetVAO);');
                        }
                    }
                    else {
                        outer(env.shared.vao, '.setVAO(null);');
                        emitAttributes(env, outer, args, program.attributes, isOuterDefn);
                        emitAttributes(env, inner, args, program.attributes, isInnerDefn);
                    }
                    emitUniforms(env, outer, args, program.uniforms, isOuterDefn, false);
                    emitUniforms(env, inner, args, program.uniforms, isInnerDefn, true);
                    emitDraw(env, outer, inner, args);
                }
            }