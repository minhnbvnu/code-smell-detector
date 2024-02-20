function setAggregators(groupAggregators, includeCollapsed) {
            if (!groupingInfos.length) {
                throw new Error("[SlickGrid DataView] At least one grouping must be specified before calling setAggregators().");
            }
            groupingInfos[0].aggregators = groupAggregators;
            groupingInfos[0].aggregateCollapsed = includeCollapsed;
            setGrouping(groupingInfos);
        }