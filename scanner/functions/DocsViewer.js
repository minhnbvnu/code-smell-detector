function DocsViewer({
  hoverFeature,
  selectedFeatures,
  buildTool,
}) {
  const hoverSelectedFeature = _.find(
    selectedFeatures,
    f => hoverFeature === f
  );

  const theDoc = docsMap(buildTool)[hoverSelectedFeature];

  if (!hoverSelectedFeature || !theDoc) {
    return null;
  }

  return <div className={styles.docsContainer}>{theDoc}</div>;
}