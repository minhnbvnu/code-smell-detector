function PlotsContainer() {
  const { state } = useState();
  if (state.task === Tasks.NATURAL_LANGUAGE) {
    return <PlotNLP />;
  }
  switch (state.model) {
    case Models.NEURAL_NETWORK_FF:
      return <VisualizerNNContainer />;
    case Models.KNN:
      return <PlotKNN />;
    case Models.LINEAR_REGRESSION:
      return <PlotLinReg />;
    default:
      return null;
  }
}