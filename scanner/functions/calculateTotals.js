function calculateTotals(totals) {
            var group = totals.group;
            var gi = groupingInfos[group.level];
            var isLeafLevel = (group.level == groupingInfos.length);
            var agg, idx = gi.aggregators.length;
            if (!isLeafLevel && gi.aggregateChildGroups) {
                // make sure all the subgroups are calculated
                var i = group.groups.length;
                while (i--) {
                    if (!group.groups[i].totals.initialized) {
                        calculateTotals(group.groups[i].totals);
                    }
                }
            }
            while (idx--) {
                agg = gi.aggregators[idx];
                agg.init();
                if (!isLeafLevel && gi.aggregateChildGroups) {
                    gi.compiledAccumulators[idx].call(agg, group.groups);
                }
                else {
                    gi.compiledAccumulators[idx].call(agg, group.rows);
                }
                agg.storeResult(totals);
            }
            totals.initialized = true;
        }