function allocPendingStats() {
                return pendingStatsPool.pop() || new PendingStats();
            }