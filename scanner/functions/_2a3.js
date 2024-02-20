function _2a3(e){
$.extend(e.data,_299.call(_2a0,e.data.left,e.data.top,e.data.width,e.data.height));
_2a1.pmask.show();
_2a1.proxy.css({display:"block",left:e.data.left,top:e.data.top});
_2a1.proxy._outerWidth(e.data.width);
_2a1.proxy._outerHeight(e.data.height);
}