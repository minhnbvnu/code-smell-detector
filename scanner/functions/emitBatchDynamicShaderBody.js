function emitBatchDynamicShaderBody(env, scope, args, program) {
                env.batchId = 'a1';
                injectExtensions(env, scope);
                function all() {
                    return true;
                }
                emitAttributes(env, scope, args, program.attributes, all);
                emitUniforms(env, scope, args, program.uniforms, all, false);
                emitDraw(env, scope, scope, args);
            }