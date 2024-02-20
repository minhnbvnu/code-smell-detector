function addTotals(groups, level) {
            level = level || 0;
            var gi = groupingInfos[level];
            var groupCollapsed = gi.collapsed;
            var toggledGroups = toggledGroupsByLevel[level];
            var idx = groups.length, g;
            while (idx--) {
                g = groups[idx];
                if (g.collapsed && !gi.aggregateCollapsed) {
                    continue;
                }
                // Do a depth-first aggregation so that parent group aggregators can access subgroup totals.
                if (g.groups) {
                    addTotals(g.groups, level + 1);
                }
                if (gi.aggregators.length && (gi.aggregateEmpty || g.rows.length || (g.groups && g.groups.length))) {
                    addGroupTotals(g);
                }
                g.collapsed = groupCollapsed ^ toggledGroups[g.groupingKey];
                g.title = gi.formatter ? gi.formatter(g) : g.value;
            }
        }