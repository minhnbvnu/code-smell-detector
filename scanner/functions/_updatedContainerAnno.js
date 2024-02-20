function _updatedContainerAnno(containerId, startPath, endPath, op) {
      var container = doc.get(containerId);
      var startComp = container.getComponent(startPath);
      var endComp = container.getComponent(endPath);
      if (startComp && endComp) {
        var startIdx = startComp.getIndex();
        var endIdx = endComp.getIndex();
        var comp = startComp;
        for (var i = startIdx; comp && i <= endIdx; i++, comp = comp.getNext()) {
          _updated(comp.getPath(), op);
        }
      } else {
        _updated(startPath, op);
        _updated(endPath, op);
      }
    }