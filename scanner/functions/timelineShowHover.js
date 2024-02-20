function timelineShowHover(prop) {

   var itm;
   if (prop.items) {
    itm = prop.items[0];
   }
   if (prop.item) {
     itm = prop.item;
   }
   if (!itm) {
        itm = getClosestId(prop);
        if (!itm) {
            NVR.log ("did not find an item to display", "error");
            return;
        }
   }

    //console.log ("ITEM HOVERED " + JSON.stringify(itm));

     // NVR.debug("TimelineCtrl/drawGraph:You hovered on item " + itm);
      //NVR.debug (" Eid=: "+itm);
      var item = graphData.get(itm);

      $scope.currentThumbEvent = timeline_instance.getEventProperties(prop.event);
      showThumbnail(item.myevent);

  }