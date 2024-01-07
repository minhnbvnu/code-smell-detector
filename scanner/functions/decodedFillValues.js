function decodedFillValues(chart) {
    return chart.data.datasets.map(function(dataset, index) {
      var meta = chart.getDatasetMeta(index) || {};
      expect(meta.$filler).toBeDefined();
      return meta.$filler.fill;
    });
  }