function _292(_293){
var _294=$.data(_293,"window");
var opts=_294.options;
var win=$(_293).panel($.extend({},_294.options,{border:false,doSize:true,closed:true,cls:"window "+(!opts.border?"window-thinborder window-noborder ":(opts.border=="thin"?"window-thinborder ":""))+(opts.cls||""),headerCls:"window-header "+(opts.headerCls||""),bodyCls:"window-body "+(opts.noheader?"window-body-noheader ":" ")+(opts.bodyCls||""),onBeforeDestroy:function(){
if(opts.onBeforeDestroy.call(_293)==false){
return false;
}
if(_294.shadow){
_294.shadow.remove();
}
if(_294.mask){
_294.mask.remove();
}
},onClose:function(){
if(_294.shadow){
_294.shadow.hide();
}
if(_294.mask){
_294.mask.hide();
}
opts.onClose.call(_293);
},onOpen:function(){
if(_294.mask){
_294.mask.css($.extend({display:"block",zIndex:$.fn.window.defaults.zIndex++},$.fn.window.getMaskSize(_293)));
}
if(_294.shadow){
_294.shadow.css({display:"block",zIndex:$.fn.window.defaults.zIndex++,left:opts.left,top:opts.top,width:_294.window._outerWidth(),height:_294.window._outerHeight()});
}
_294.window.css("z-index",$.fn.window.defaults.zIndex++);
opts.onOpen.call(_293);
},onResize:function(_295,_296){
var _297=$(this).panel("options");
$.extend(opts,{width:_297.width,height:_297.height,left:_297.left,top:_297.top});
if(_294.shadow){
_294.shadow.css({left:opts.left,top:opts.top,width:_294.window._outerWidth(),height:_294.window._outerHeight()});
}
opts.onResize.call(_293,_295,_296);
},onMinimize:function(){
if(_294.shadow){
_294.shadow.hide();
}
if(_294.mask){
_294.mask.hide();
}
_294.options.onMinimize.call(_293);
},onBeforeCollapse:function(){
if(opts.onBeforeCollapse.call(_293)==false){
return false;
}
if(_294.shadow){
_294.shadow.hide();
}
},onExpand:function(){
if(_294.shadow){
_294.shadow.show();
}
opts.onExpand.call(_293);
}}));
_294.window=win.panel("panel");
if(_294.mask){
_294.mask.remove();
}
if(opts.modal){
_294.mask=$("<div class=\"window-mask\" style=\"display:none\"></div>").insertAfter(_294.window);
}
if(_294.shadow){
_294.shadow.remove();
}
if(opts.shadow){
_294.shadow=$("<div class=\"window-shadow\" style=\"display:none\"></div>").insertAfter(_294.window);
}
var _298=opts.closed;
if(opts.left==null){
_288(_293);
}
if(opts.top==null){
_28d(_293);
}
_284(_293);
if(!_298){
win.window("open");
}
}