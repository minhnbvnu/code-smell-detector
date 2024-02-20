function expandCollapseGroup(level, groupingKey, collapse) {
            toggledGroupsByLevel[level][groupingKey] = groupingInfos[level].collapsed ^ collapse;
            refresh();
        }