function _2a2(e){
if(_2a1.pmask){
_2a1.pmask.remove();
}
_2a1.pmask=$("<div class=\"window-proxy-mask\"></div>").insertAfter(_2a1.window);
_2a1.pmask.css({display:"none",zIndex:$.fn.window.defaults.zIndex++,left:e.data.left,top:e.data.top,width:_2a1.window._outerWidth(),height:_2a1.window._outerHeight()});
if(_2a1.proxy){
_2a1.proxy.remove();
}
_2a1.proxy=$("<div class=\"window-proxy\"></div>").insertAfter(_2a1.window);
_2a1.proxy.css({display:"none",zIndex:$.fn.window.defaults.zIndex++,left:e.data.left,top:e.data.top});
_2a1.proxy._outerWidth(e.data.width)._outerHeight(e.data.height);
_2a1.proxy.hide();
setTimeout(function(){
if(_2a1.pmask){
_2a1.pmask.show();
}
if(_2a1.proxy){
_2a1.proxy.show();
}
},500);
}