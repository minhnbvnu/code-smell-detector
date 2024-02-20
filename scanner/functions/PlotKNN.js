function PlotKNN() {
  const { model_state } = useModelState();
  const data = createPlotData(model_state);
  const columns = model_state.knn_columns;
  const columnMap = model_state.knn_columns_map;
  const xAxisColumn = columnMap[columns[model_state.knn_column1_index]];
  const yAxisColumn = columnMap[columns[model_state.knn_column2_index]];

  return (
    <>
      {!model_state.viz_loading ? (
        <ResponsiveContainer
          className="graph-wrapper"
          width="100%"
          height="100%"
        >
          <ScatterChart
            margin={{
              top: 20,
              right: 20,
              bottom: 20,
              left: 20,
            }}
          >
            <CartesianGrid />
            <XAxis
              type="number"
              dataKey="x"
              name={xAxisColumn}
              unit={
                model_state.knn_column_units
                  ? model_state.knn_column_units[model_state.knn_column1_index]
                  : ""
              }
            >
              <Label value={xAxisColumn} position="insideBottom" offset={-12} />
            </XAxis>
            <YAxis
              type="number"
              dataKey="y"
              name={yAxisColumn}
              unit={
                model_state.knn_column_units
                  ? model_state.knn_column_units[model_state.knn_column2_index]
                  : ""
              }
            >
              <Label value={yAxisColumn} angle={-90} position="insideLeft" />
            </YAxis>
            <Tooltip cursor={{ strokeDasharray: "3 3" }} />
            <Legend verticalAlign="top" height={36} />
            {model_state.knn_labels.map((label, index) => (
              <Scatter
                name={label}
                data={data[index]}
                fill={fillColors[index]}
                shape={shapeTypes[index]}
                key={index}
              />
            ))}
          </ScatterChart>
        </ResponsiveContainer>
      ) : (
        <LoadingComponent />
      )}
    </>
  );
}