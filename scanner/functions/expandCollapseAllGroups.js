function expandCollapseAllGroups(level, collapse) {
            if (level == null) {
                for (var i = 0; i < groupingInfos.length; i++) {
                    toggledGroupsByLevel[i] = {};
                    groupingInfos[i].collapsed = collapse;
                    if (collapse === true) {
                        onGroupCollapsed.notify({ level: i, groupingKey: null });
                    }
                    else {
                        onGroupExpanded.notify({ level: i, groupingKey: null });
                    }
                }
            }
            else {
                toggledGroupsByLevel[level] = {};
                groupingInfos[level].collapsed = collapse;
                if (collapse === true) {
                    onGroupCollapsed.notify({ level: level, groupingKey: null });
                }
                else {
                    onGroupExpanded.notify({ level: level, groupingKey: null });
                }
            }
            refresh();
        }