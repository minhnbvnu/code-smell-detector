function initResizeState() {
  let horizontalPercentage = 0.65;
  let verticalPercentage = 0.5;

  try {
    let data = Object(storage["a" /* localStorageGetItem */])(LOCAL_STORAGE_KEY);

    if (data != null) {
      data = JSON.parse(data);
      horizontalPercentage = data.horizontalPercentage;
      verticalPercentage = data.verticalPercentage;
    }
  } catch (error) {}

  return {
    horizontalPercentage,
    isResizing: false,
    verticalPercentage
  };
}