function _2a4(e,_2a5){
$.extend(e.data,_299.call(_2a0,e.data.left,e.data.top,e.data.width+0.1,e.data.height+0.1));
$(_2a0).window(_2a5,e.data);
_2a1.pmask.remove();
_2a1.pmask=null;
_2a1.proxy.remove();
_2a1.proxy=null;
}