function moveStart(event) {

    _moveStart = true;
    targetID = event.target.id.substring(7);
    // console.log ("START: target id="+targetID);

    if (event.preventDefault) event.preventDefault();
    if (event.gesture) event.gesture.preventDefault();
    if (event.gesture) event.gesture.stopPropagation();

    var z = $ionicScrollDelegate.$getByHandle("imgscroll").getScrollPosition().zoom;
    //console.log ("zoom is:"+z);

    var x, y;
    // perhaps event.targetTouches[0]?
    if (event.touches) {
      //console.log(event.changedTouches[0], this, "t");
      x = event.touches[0].pageX;
      y = event.touches[0].pageY;
    } else {
      //console.log(event, this, "t");
      x = event.clientX;
      y = event.clientY;
    }
    //console.log ("X="+x+" Y="+y + " sl="+document.body.scrollLeft+ " sy="+document.body.scrollTop);

  }