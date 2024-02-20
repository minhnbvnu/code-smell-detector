function pushScopeStats(start, end, stats) {
                var ps = allocPendingStats();
                ps.startQueryIndex = start;
                ps.endQueryIndex = end;
                ps.sum = 0;
                ps.stats = stats;
                pendingStats.push(ps);
            }