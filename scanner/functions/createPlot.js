function createPlot(props) {
    return new Promise((resolve, reject) => {
      const plot = mount(
        <PlotComponent {...props} onInitialized={() => resolve(plot)} onError={reject} />
      );
    });
  }