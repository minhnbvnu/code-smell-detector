function addGroupTotals(group) {
            var gi = groupingInfos[group.level];
            var totals = new Slick.GroupTotals();
            totals.group = group;
            group.totals = totals;
            if (!gi.lazyTotalsCalculation) {
                calculateTotals(totals);
            }
        }