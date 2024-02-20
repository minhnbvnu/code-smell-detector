function moveContinue(event) {
    if (!_moveStart) {
      return;
    }

    // console.log ("CONTINUE: target id="+targetID);


    /*if(event.preventDefault) event.preventDefault();
    if (event.gesture) event.gesture.preventDefault() ;
    if (event.gesture) event.gesture.stopPropagation();*/

    var x, y;

    var z = $ionicScrollDelegate.$getByHandle("imgscroll").getScrollPosition().zoom;
    // console.log ("zoom is:"+z);

    //console.log(event, this, "t");
    if (event.touches) {
      //console.log ("TOUCH");
      x = event.targetTouches[0].pageX;
      y = event.targetTouches[0].pageY;
    } else {
      //console.log ("MOUSE");
      x = event.clientX;
      y = event.clientY;
    }

    // console.log ("X="+x+" Y="+y + " sl="+document.body.scrollLeft+ " sy="+document.body.scrollTop);
    $timeout(function () {
      recomputePolygons(x, y, targetID, 1);
    });
  }