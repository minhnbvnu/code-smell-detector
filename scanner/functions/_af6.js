function _af6(_af7,text){
var _af8=$.data(_af7,"combo");
var _af9=$(_af7).textbox("getText");
if(_af9!=text){
$(_af7).textbox("setText",text);
}
_af8.previousText=text;
}