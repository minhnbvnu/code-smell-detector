function parseFramebuffer(options, env) {
                var staticOptions = options.static;
                var dynamicOptions = options.dynamic;
                if (S_FRAMEBUFFER in staticOptions) {
                    var framebuffer = staticOptions[S_FRAMEBUFFER];
                    if (framebuffer) {
                        framebuffer = framebufferState.getFramebuffer(framebuffer);
                        check$1.command(framebuffer, 'invalid framebuffer object');
                        return createStaticDecl(function (env, block) {
                            var FRAMEBUFFER = env.link(framebuffer);
                            var shared = env.shared;
                            block.set(shared.framebuffer, '.next', FRAMEBUFFER);
                            var CONTEXT = shared.context;
                            block.set(CONTEXT, '.' + S_FRAMEBUFFER_WIDTH, FRAMEBUFFER + '.width');
                            block.set(CONTEXT, '.' + S_FRAMEBUFFER_HEIGHT, FRAMEBUFFER + '.height');
                            return FRAMEBUFFER;
                        });
                    }
                    else {
                        return createStaticDecl(function (env, scope) {
                            var shared = env.shared;
                            scope.set(shared.framebuffer, '.next', 'null');
                            var CONTEXT = shared.context;
                            scope.set(CONTEXT, '.' + S_FRAMEBUFFER_WIDTH, CONTEXT + '.' + S_DRAWINGBUFFER_WIDTH);
                            scope.set(CONTEXT, '.' + S_FRAMEBUFFER_HEIGHT, CONTEXT + '.' + S_DRAWINGBUFFER_HEIGHT);
                            return 'null';
                        });
                    }
                }
                else if (S_FRAMEBUFFER in dynamicOptions) {
                    var dyn = dynamicOptions[S_FRAMEBUFFER];
                    return createDynamicDecl(dyn, function (env, scope) {
                        var FRAMEBUFFER_FUNC = env.invoke(scope, dyn);
                        var shared = env.shared;
                        var FRAMEBUFFER_STATE = shared.framebuffer;
                        var FRAMEBUFFER = scope.def(FRAMEBUFFER_STATE, '.getFramebuffer(', FRAMEBUFFER_FUNC, ')');
                        check$1.optional(function () {
                            env.assert(scope, '!' + FRAMEBUFFER_FUNC + '||' + FRAMEBUFFER, 'invalid framebuffer object');
                        });
                        scope.set(FRAMEBUFFER_STATE, '.next', FRAMEBUFFER);
                        var CONTEXT = shared.context;
                        scope.set(CONTEXT, '.' + S_FRAMEBUFFER_WIDTH, FRAMEBUFFER + '?' + FRAMEBUFFER + '.width:' +
                            CONTEXT + '.' + S_DRAWINGBUFFER_WIDTH);
                        scope.set(CONTEXT, '.' + S_FRAMEBUFFER_HEIGHT, FRAMEBUFFER +
                            '?' + FRAMEBUFFER + '.height:' +
                            CONTEXT + '.' + S_DRAWINGBUFFER_HEIGHT);
                        return FRAMEBUFFER;
                    });
                }
                else {
                    return null;
                }
            }