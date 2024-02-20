function setDoneResults(_ref2) {
    var nodesTested = _ref2.nodesTested,
        nodesFound = _ref2.nodesFound;
    WINDOW.FontAwesomeDetection = WINDOW.FontAwesomeDetection || {};
    WINDOW.FontAwesomeDetection.nodesTested = nodesTested;
    WINDOW.FontAwesomeDetection.nodesFound = nodesFound;
    WINDOW.FontAwesomeDetection.detectionDone = true;
  }