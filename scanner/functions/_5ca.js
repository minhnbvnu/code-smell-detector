function _5ca(_5cf,_5d0){
var t=$(_5cf);
var opts=t.passwordbox("options");
var icon=t.next().find(".passwordbox-open");
var _5d1=unescape(opts.passwordChar);
_5d0=_5d0==undefined?t.textbox("getValue"):_5d0;
t.textbox("setValue",_5d0);
t.textbox("setText",opts.revealed?_5d0:_5d0.replace(/./ig,_5d1));
opts.revealed?icon.addClass("passwordbox-close"):icon.removeClass("passwordbox-close");
}