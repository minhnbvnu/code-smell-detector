function beginQuery(stats) {
                var query = allocQuery();
                extensions.ext_disjoint_timer_query.beginQueryEXT(GL_TIME_ELAPSED_EXT, query);
                pendingQueries.push(query);
                pushScopeStats(pendingQueries.length - 1, pendingQueries.length, stats);
            }