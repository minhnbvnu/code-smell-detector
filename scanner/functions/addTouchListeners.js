function addTouchListeners() {
    //console.log("in gui.addTouchListeners()");
    canvas.addEventListener("touchstart", handleTouchStart, false);
    canvas.addEventListener("touchmove", handleTouchMove, false);
    canvas.addEventListener("touchend", handleTouchEnd, false);
    canvas.addEventListener("touchcancel", cancelActivities, false);
    //console.log("addTouchListeners(): initialized some touch listeners");
}