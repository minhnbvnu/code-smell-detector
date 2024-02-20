function RankedChartBuilder_getChartData({
  commitIndex,
  commitTree,
  profilerStore,
  rootID
}) {
  const commitDatum = profilerStore.getCommitData(rootID, commitIndex);
  const {
    fiberActualDurations,
    fiberSelfDurations
  } = commitDatum;
  const {
    nodes
  } = commitTree;
  const chartDataKey = `${rootID}-${commitIndex}`;

  if (RankedChartBuilder_cachedChartData.has(chartDataKey)) {
    return RankedChartBuilder_cachedChartData.get(chartDataKey);
  }

  let maxSelfDuration = 0;
  const chartNodes = [];
  fiberActualDurations.forEach((actualDuration, id) => {
    const node = nodes.get(id);

    if (node == null) {
      throw Error(`Could not find node with id "${id}" in commit tree`);
    }

    const {
      displayName,
      key,
      parentID,
      type
    } = node; // Don't show the root node in this chart.

    if (parentID === 0) {
      return;
    }

    const selfDuration = fiberSelfDurations.get(id) || 0;
    maxSelfDuration = Math.max(maxSelfDuration, selfDuration);
    const name = displayName || 'Anonymous';
    const maybeKey = key !== null ? ` key="${key}"` : '';
    let maybeBadge = '';

    if (type === types["g" /* ElementTypeForwardRef */]) {
      maybeBadge = ' (ForwardRef)';
    } else if (type === types["j" /* ElementTypeMemo */]) {
      maybeBadge = ' (Memo)';
    }

    const label = `${name}${maybeBadge}${maybeKey} (${formatDuration(selfDuration)}ms)`;
    chartNodes.push({
      id,
      label,
      name,
      value: selfDuration
    });
  });
  const chartData = {
    maxValue: maxSelfDuration,
    nodes: chartNodes.sort((a, b) => b.value - a.value)
  };
  RankedChartBuilder_cachedChartData.set(chartDataKey, chartData);
  return chartData;
}