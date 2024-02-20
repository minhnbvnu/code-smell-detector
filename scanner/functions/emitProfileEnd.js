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