function doRightClick(){rightClickPending=false;var t=rightClickEvent,D=document.createEvent("MouseEvent");D.initMouseEvent("mouseup",true,true,window,1,t.screenX,t.screenY,t.clientX,t.clientY,false,false,false,false,0,null);t.target.dispatchEvent(D);D=document.createEvent("MouseEvent");D.initMouseEvent("mousedown",true,true,window,1,t.screenX,t.screenY,t.clientX,t.clientY,false,false,false,false,2,null);t.target.dispatchEvent(D);D=document.createEvent("MouseEvent");D.initMouseEvent("contextmenu",
true,true,window,1,t.screenX+50,t.screenY+5,t.clientX+50,t.clientY+5,false,false,false,false,2,null);t.target.dispatchEvent(D);cancelMouseUp=true;rightClickEvent=null}