function getUserVisibleLines(cm) {
      var scrollInfo = cm.getScrollInfo();
      var occludeToleranceTop = 6;
      var occludeToleranceBottom = 10;
      var from = cm.coordsChar({left:0, top: occludeToleranceTop + scrollInfo.top}, 'local');
      var bottomY = scrollInfo.clientHeight - occludeToleranceBottom + scrollInfo.top;
      var to = cm.coordsChar({left:0, top: bottomY}, 'local');
      return {top: from.line, bottom: to.line};
    }