function timelineAnalyzeFrames(prop) {
    // console.log ("DOUBLE");
    var itm = prop.item;
   // console.log ("ITEM CLICKED " + itm);
    if (!itm) {
        itm = getClosestId(prop);
        if (!itm) {
            NVR.log ("did not find an item to display", "error");
            return;
        }
    }

   
      NVR.debug("TimelineCtrl/drawGraph:You clicked on item " + itm);
      var item = graphData.get(itm);
      NVR.debug("TimelineCtrl/drawGraph: clicked item details:" + JSON.stringify(item));
      eventDetails(item.myevent);
  }