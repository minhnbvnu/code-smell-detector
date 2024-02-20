function onGraphReady(readyGraph) {
    if (readyGraph === graph) {
      layout.setGraphReady();
      progress.startLayout();
    }
  }