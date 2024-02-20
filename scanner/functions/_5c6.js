function _5c6(_5c7){
var _5c8=$.data(_5c7,"passwordbox");
var opts=_5c8.options;
var _5c9=$.extend(true,[],opts.icons);
if(opts.showEye){
_5c9.push({iconCls:"passwordbox-open",handler:function(e){
opts.revealed=!opts.revealed;
_5ca(_5c7);
}});
}
$(_5c7).addClass("passwordbox-f").textbox($.extend({},opts,{icons:_5c9}));
_5ca(_5c7);
}