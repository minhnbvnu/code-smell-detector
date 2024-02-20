function compileCommand(options, attributes, uniforms, context, stats) {
                var env = createREGLEnvironment();
                // link stats, so that we can easily access it in the program.
                env.stats = env.link(stats);
                // splat options and attributes to allow for dynamic nested properties
                Object.keys(attributes.static).forEach(function (key) {
                    splatObject(env, attributes, key);
                });
                NESTED_OPTIONS.forEach(function (name) {
                    splatObject(env, options, name);
                });
                var args = parseArguments(options, attributes, uniforms, context, env);
                emitDrawProc(env, args);
                emitScopeProc(env, args);
                emitBatchProc(env, args);
                return extend(env.compile(), {
                    destroy: function () {
                        args.shader.program.destroy();
                    }
                });
            }