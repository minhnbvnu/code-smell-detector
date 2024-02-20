function dressData(data, depVar, indVar, columns) {
  const linRegData = [];
  data.map((point) => {
    linRegData.push([point[columns[indVar]], point[columns[depVar]]]);
  });
  return linRegData;
}