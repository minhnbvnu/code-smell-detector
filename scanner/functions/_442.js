function _442(e){
var _443=e.data.target;
var _444=$.data(_443,"menu");
if(_444.options.hideOnUnhover){
_444.timer=setTimeout(function(){
_445(_443,$(_443).hasClass("menu-inline"));
},_444.options.duration);
}
}