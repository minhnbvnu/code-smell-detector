function _7b(e){
var _7c=e.data;
var t=$(_7c.target);
t.css({left:_7c.left,top:_7c.top});
if(t.outerWidth()!=_7c.width){
t._outerWidth(_7c.width);
}
if(t.outerHeight()!=_7c.height){
t._outerHeight(_7c.height);
}
}