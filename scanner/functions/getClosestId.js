function getClosestId(prop) {
    prop = timeline_instance.getEventProperties(prop.event);
    var closestId = null;

    var target = new Date(prop.time).getTime();
    NVR.debug ("item is not exact, so guessing from time " + target + " with group=" + prop.group);
    if (prop.group) {
      var visible = timeline_instance.getVisibleItems();
     NVR.debug("Show hover: Visible items=" + JSON.stringify(visible));
     var minDist = Number.MAX_VALUE;
     //var minDist = 1.8e7; // 5 hrs in milliseconds
      var _item;
      //NVR.debug("ITEM SET IS : " + JSON.stringify(timeline_instance.itemSet));
      for (var x = 0; x < visible.length; x++) {
        _item = graphData.get(visible[x]);
        if (_item.group != prop.group) continue;
        //console.log ("ITEM start/end is:"+_item.start+'/'+_item.end);
        var dist = Math.min( Math.abs(_item.start - target), Math.abs(_item.end - target));
        if (dist < minDist ) {
            closestId = _item.id;
            minDist = dist;
           // NVR.debug ("ID:"+closestId+' is closest for now, with dist='+dist);
        }
      }

      if (closestId != null) { 
        NVR.log("Final closest item" + closestId + " group: " + prop.group);


      } else {
        NVR.log("Did not find a visible item match");
        $scope.thumbData = {
            url: '',
            eid: $translate.instant('kMonNone'),
            time: $translate.instant('kMonNone'),
            monName: $translate.instant('kMonNone')
        };
       
      }
    } else // no group row tapped, do nothing
    {
       NVR.debug ("No group id found, cannot approximate");

      /*$ionicLoading.show({
          template: "",
          animation: 'fade-in',
          showBackdrop: false,
          maxWidth: 200,
          showDelay: 0,
          duration: 1500,
      });*/
    }
    return closestId;
  }