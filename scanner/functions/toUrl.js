function toUrl(selectedTab, selectedFeatures) {
  const selectedArray = getSelectedArray(selectedFeatures);
  const mainLibs = _.remove(selectedArray, (i) =>
    _.includes(['react', 'vue', 'svelte', 'no-library'], i)
  );
  const path = _.join(_.sortBy(selectedArray), '--');
  return `/${selectedTab}/${_.kebabCase(mainLibs)}${path ? '--' + path : ''}`;
}