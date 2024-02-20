function SnapshotCommitListItem_SnapshotCommitListItem({
  data: itemData,
  index,
  style
}) {
  const {
    filteredCommitIndices,
    maxDuration,
    selectedCommitIndex,
    selectCommitIndex,
    setHoveredCommitIndex,
    startCommitDrag,
    totalDurations
  } = itemData;
  index = filteredCommitIndices[index];
  const totalDuration = totalDurations[index]; // Use natural cbrt for bar height.
  // This prevents one (or a few) outliers from squishing the majority of other commits.
  // So rather than e.g. _█_ we get something more like e.g. ▄█_

  const heightScale = Math.min(1, Math.max(0, Math.cbrt(totalDuration) / Math.cbrt(maxDuration))) || 0; // Use a linear scale for color.
  // This gives some visual contrast between cheaper and more expensive commits
  // and somewhat compensates for the cbrt scale height.

  const colorScale = Math.min(1, Math.max(0, totalDuration / maxDuration)) || 0;
  const isSelected = selectedCommitIndex === index; // Leave a 1px gap between snapshots

  const width = parseFloat(style.width) - 1;

  const handleMouseDown = ({
    buttons,
    target
  }) => {
    if (buttons === 1) {
      selectCommitIndex(index);
      startCommitDrag({
        commitIndex: index,
        left: target.getBoundingClientRect().left,
        sizeIncrement: parseFloat(style.width)
      });
    }
  };

  let backgroundColor;

  if (!isSelected && totalDuration > 0) {
    backgroundColor = getGradientColor(colorScale);
  }

  return /*#__PURE__*/react["createElement"]("div", {
    className: SnapshotCommitListItem_default.a.Outer,
    onMouseDown: handleMouseDown,
    onMouseEnter: () => setHoveredCommitIndex(index),
    style: { ...style,
      width,
      borderBottom: isSelected ? '3px solid var(--color-tab-selected-border)' : undefined
    }
  }, /*#__PURE__*/react["createElement"]("div", {
    className: isSelected ? SnapshotCommitListItem_default.a.InnerSelected : SnapshotCommitListItem_default.a.Inner,
    style: {
      height: `${Math.round(heightScale * 100)}%`,
      backgroundColor
    }
  }));
}