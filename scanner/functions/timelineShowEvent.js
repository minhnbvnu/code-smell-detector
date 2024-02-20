function timelineShowEvent(prop) {

      var itm = prop.item;
      if (!itm) {
          itm = getClosestId(prop);
          if (!itm) {
            NVR.log ("did not find an item to display", "error");
            return;
        }
      }

      if (itm) {
        NVR.debug("TimelineCtrl/drawGraph:You clicked on item " + itm);
        var item = graphData.get(itm);
        NVR.debug("TimelineCtrl/drawGraph: clicked item details:" + JSON.stringify(item));
        showEvent(item.myevent);

      } 
   
  }