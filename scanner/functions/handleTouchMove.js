function handleTouchMove(evt) {
    //console.log("in handleTouchMove(evt)");
    evt.preventDefault();

    getTouchCoordinates(evt); // xUser, yUser

    // do the actual action (=> mouse section)
    // [xy]UserDown from handleTouchStart

    doDragging(xUser,yUser,xUserDown,yUserDown);

    // test
    if(false){
        ctx.beginPath();
        ctx.arc(scale*xUser,-scale*yUser,
	    4, 0, 2 * Math.PI, false);  // a circle at the start
        ctx.fillStyle = "rgb(0,0,255)";
        ctx.fill();
    }

}