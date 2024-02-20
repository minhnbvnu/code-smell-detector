function emitProfile(env, scope, args, useScope, incrementCounter) {
                var shared = env.shared;
                var STATS = env.stats;
                var CURRENT_STATE = shared.current;
                var TIMER = shared.timer;
                var profileArg = args.profile;
                function perfCounter() {
                    if (typeof performance === 'undefined') {
                        return 'Date.now()';
                    }
                    else {
                        return 'performance.now()';
                    }
                }
                var CPU_START, QUERY_COUNTER;
                function emitProfileStart(block) {
                    CPU_START = scope.def();
                    block(CPU_START, '=', perfCounter(), ';');
                    if (typeof incrementCounter === 'string') {
                        block(STATS, '.count+=', incrementCounter, ';');
                    }
                    else {
                        block(STATS, '.count++;');
                    }
                    if (timer) {
                        if (useScope) {
                            QUERY_COUNTER = scope.def();
                            block(QUERY_COUNTER, '=', TIMER, '.getNumPendingQueries();');
                        }
                        else {
                            block(TIMER, '.beginQuery(', STATS, ');');
                        }
                    }
                }
                function emitProfileEnd(block) {
                    block(STATS, '.cpuTime+=', perfCounter(), '-', CPU_START, ';');
                    if (timer) {
                        if (useScope) {
                            block(TIMER, '.pushScopeStats(', QUERY_COUNTER, ',', TIMER, '.getNumPendingQueries(),', STATS, ');');
                        }
                        else {
                            block(TIMER, '.endQuery();');
                        }
                    }
                }
                function scopeProfile(value) {
                    var prev = scope.def(CURRENT_STATE, '.profile');
                    scope(CURRENT_STATE, '.profile=', value, ';');
                    scope.exit(CURRENT_STATE, '.profile=', prev, ';');
                }
                var USE_PROFILE;
                if (profileArg) {
                    if (isStatic(profileArg)) {
                        if (profileArg.enable) {
                            emitProfileStart(scope);
                            emitProfileEnd(scope.exit);
                            scopeProfile('true');
                        }
                        else {
                            scopeProfile('false');
                        }
                        return;
                    }
                    USE_PROFILE = profileArg.append(env, scope);
                    scopeProfile(USE_PROFILE);
                }
                else {
                    USE_PROFILE = scope.def(CURRENT_STATE, '.profile');
                }
                var start = env.block();
                emitProfileStart(start);
                scope('if(', USE_PROFILE, '){', start, '}');
                var end = env.block();
                emitProfileEnd(end);
                scope.exit('if(', USE_PROFILE, '){', end, '}');
            }