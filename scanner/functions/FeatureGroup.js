function FeatureGroup({
  featureList,
  group,
  selected,
  setSelected,
  onMouseEnter,
  onMouseLeave,
  selectedBuildTool,
  features,
}) {
  const [expanded, setExpanded] = useState(group === 'Main library');
  const isRadio = group === 'Main library';
  const prevSelected = usePrevious(selected);
  useEffect(() => {
    const anyChanged = _.reduce(
      featureList,
      (result, { feature }) => {
        return (
          result ||
          selected[feature] !== (prevSelected && prevSelected[feature])
        );
      },
      false
    );
    if (anyChanged) {
      setExpanded(true);
    }
  }, [selected, featureList, prevSelected]);

  return (
    <div className={styles.featureGroup}>
      <div
        className={styles.featureGroupName}
        onClick={() => setExpanded(!expanded)}
      >
        {group !== 'undefined' ? (expanded ? '− ' : '+ ') + group : ''}
      </div>
      {expanded ? (
        <div className={styles.featureGroupContainer}>
          {_.map(featureList, ({ feature }) => (
            <Feature
              featureName={features[feature].name}
              feature={feature}
              isRadio={isRadio} // main library options should be type radio
              selected={selected[feature]}
              setSelected={setSelected}
              onMouseEnter={onMouseEnter}
              onMouseLeave={onMouseLeave}
              selectedBuildTool={selectedBuildTool}
              key={feature}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}