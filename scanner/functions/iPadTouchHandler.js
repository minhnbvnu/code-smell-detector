function iPadTouchHandler(t){var D="";if(!(t.touches.length>1)){switch(t.type){case "touchstart":if($(t.changedTouches[0].target).is("select"))return;iPadTouchStart(t);t.preventDefault();return false;case "touchmove":cancelHold();D="mousemove";t.preventDefault();break;case "touchend":if(cancelMouseUp){cancelMouseUp=false;t.preventDefault();return false}cancelHold();D="mouseup";break;default:return}t=t.changedTouches[0];var z=document.createEvent("MouseEvent");z.initMouseEvent(D,true,true,window,1,
t.screenX,t.screenY,t.clientX,t.clientY,false,false,false,false,0,null);t.target.dispatchEvent(z);if(D=="mouseup"&&tapValid&&t.target==lastTap){z=document.createEvent("MouseEvent");z.initMouseEvent("click",true,true,window,1,t.screenX,t.screenY,t.clientX,t.clientY,false,false,false,false,0,null);t.target.dispatchEvent(z)}}}