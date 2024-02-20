function _c2a(_c2b,_c2c){
var span=$(_c2b).next();
var _c2d=_c2c?$(_c2c):span.find(".tagbox-label");
if(_c2d.length){
var _c2e=$(_c2b).tagbox("textbox");
var _c2f=$(_c2d[0]);
var _c30=_c2f.outerHeight(true)-_c2f.outerHeight();
var _c31=_c2e.outerHeight()-_c30*2;
_c2d.css({height:_c31+"px",lineHeight:_c31+"px"});
var _c32=span.find(".textbox-addon").css("height","100%");
_c32.find(".textbox-icon").css("height","100%");
span.find(".textbox-button").linkbutton("resize",{height:"100%"});
}
}