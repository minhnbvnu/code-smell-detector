function getMetaValueLabel(data) {
  if (utils_hasOwnProperty.call(data, hydration["d" /* meta */].preview_long)) {
    return data[hydration["d" /* meta */].preview_long];
  } else {
    return Object(utils["d" /* formatDataForPreview */])(data, true);
  }
}