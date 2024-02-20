function invokeLinReg(dispatch, sampleDataset, indVar, setAxes = false) {
  dispatch({
    type: ModelActions.RUNNING,
  });
  const datas = datasetMetadata[sampleDataset];
  let data = datas.data;
  const trainAgainst =
    indVar != null ? datas.columns.indexOf(indVar) : datas.indVar;
  data = dressData(data, datas.depVar, trainAgainst, datas.columns);
  data = shuffleArray(data);

  const separationSize = 0.7 * data.length;
  const train = data.slice(0, separationSize);
  const test = data.slice(separationSize);

  const result = regression.linear(train);
  const testResult = test.map((point) => result.predict(point[0]));

  const dispatchObject = {
    type: ModelActions.LINREG_DONE,
    linreg_test_result: testResult,
    linreg_test_set: test,
    linreg_columns: datas.columns,
    linreg_r2: result.r2,
  };
  if (setAxes) {
    dispatchObject["linreg_x_name"] = datas.columns[datas.indVar];
    dispatchObject["linreg_y_name"] = datas.columns[datas.depVar];
  }
  setTimeout(function () {
    dispatch(dispatchObject);
  }, 700);
}