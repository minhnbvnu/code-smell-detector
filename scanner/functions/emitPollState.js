function emitPollState(env, scope, args) {
                var shared = env.shared;
                var GL = shared.gl;
                var CURRENT_VARS = env.current;
                var NEXT_VARS = env.next;
                var CURRENT_STATE = shared.current;
                var NEXT_STATE = shared.next;
                var block = env.cond(CURRENT_STATE, '.dirty');
                GL_STATE_NAMES.forEach(function (prop) {
                    var param = propName(prop);
                    if (param in args.state) {
                        return;
                    }
                    var NEXT, CURRENT;
                    if (param in NEXT_VARS) {
                        NEXT = NEXT_VARS[param];
                        CURRENT = CURRENT_VARS[param];
                        var parts = loop(currentState[param].length, function (i) {
                            return block.def(NEXT, '[', i, ']');
                        });
                        block(env.cond(parts.map(function (p, i) {
                            return p + '!==' + CURRENT + '[' + i + ']';
                        }).join('||'))
                            .then(GL, '.', GL_VARIABLES[param], '(', parts, ');', parts.map(function (p, i) {
                            return CURRENT + '[' + i + ']=' + p;
                        }).join(';'), ';'));
                    }
                    else {
                        NEXT = block.def(NEXT_STATE, '.', param);
                        var ifte = env.cond(NEXT, '!==', CURRENT_STATE, '.', param);
                        block(ifte);
                        if (param in GL_FLAGS) {
                            ifte(env.cond(NEXT)
                                .then(GL, '.enable(', GL_FLAGS[param], ');')
                                .else(GL, '.disable(', GL_FLAGS[param], ');'), CURRENT_STATE, '.', param, '=', NEXT, ';');
                        }
                        else {
                            ifte(GL, '.', GL_VARIABLES[param], '(', NEXT, ');', CURRENT_STATE, '.', param, '=', NEXT, ';');
                        }
                    }
                });
                if (Object.keys(args.state).length === 0) {
                    block(CURRENT_STATE, '.dirty=false;');
                }
                scope(block);
            }