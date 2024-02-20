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