function computeFitCategoryTraits(index, ruler, options, stackCount) {
  const thickness = options.barThickness;
  let size, ratio;

  if (isNullOrUndef(thickness)) {
    size = ruler.min * options.categoryPercentage;
    ratio = options.barPercentage;
  } else {
    // When bar thickness is enforced, category and bar percentages are ignored.
    // Note(SB): we could add support for relative bar thickness (e.g. barThickness: '50%')
    // and deprecate barPercentage since this value is ignored when thickness is absolute.
    size = thickness * stackCount;
    ratio = 1;
  }

  return {
    chunk: size / stackCount,
    ratio,
    start: ruler.pixels[index] - (size / 2)
  };
}