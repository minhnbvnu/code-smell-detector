function addPostCSSandCSSIfTailwindCSS(
  allFeatureStates,
  affectedFeature,
  setToSelected
) {
  return {
    ...allFeatureStates,
    css:
      affectedFeature === 'tailwind-css' && setToSelected
        ? true
        : allFeatureStates.css,
    postcss:
      affectedFeature === 'tailwind-css' && setToSelected
        ? true
        : allFeatureStates.postcss,
  };
}