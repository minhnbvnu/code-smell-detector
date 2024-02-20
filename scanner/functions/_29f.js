function _29f(_2a0){
var _2a1=$.data(_2a0,"window");
_2a1.window.draggable({handle:">div.panel-header>div.panel-title",disabled:_2a1.options.draggable==false,onBeforeDrag:function(e){
if(_2a1.mask){
_2a1.mask.css("z-index",$.fn.window.defaults.zIndex++);
}
if(_2a1.shadow){
_2a1.shadow.css("z-index",$.fn.window.defaults.zIndex++);
}
_2a1.window.css("z-index",$.fn.window.defaults.zIndex++);
},onStartDrag:function(e){
_2a2(e);
},onDrag:function(e){
_2a3(e);
return false;
},onStopDrag:function(e){
_2a4(e,"move");
}});
_2a1.window.resizable({disabled:_2a1.options.resizable==false,onStartResize:function(e){
_2a2(e);
},onResize:function(e){
_2a3(e);
return false;
},onStopResize:function(e){
_2a4(e,"resize");
}});
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
};
function _2a3(e){
$.extend(e.data,_299.call(_2a0,e.data.left,e.data.top,e.data.width,e.data.height));
_2a1.pmask.show();
_2a1.proxy.css({display:"block",left:e.data.left,top:e.data.top});
_2a1.proxy._outerWidth(e.data.width);
_2a1.proxy._outerHeight(e.data.height);
};
function _2a4(e,_2a5){
$.extend(e.data,_299.call(_2a0,e.data.left,e.data.top,e.data.width+0.1,e.data.height+0.1));
$(_2a0).window(_2a5,e.data);
_2a1.pmask.remove();
_2a1.pmask=null;
_2a1.proxy.remove();
_2a1.proxy=null;
};
}