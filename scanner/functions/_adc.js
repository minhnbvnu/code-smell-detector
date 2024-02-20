function _adc(_add){
var _ade=$.data(_add,"combo").panel;
if(_ade.is(":visible")){
var _adf=_ade.combo("combo");
_ae0(_adf);
if(_adf!=_add){
$(_add).combo("showPanel");
}
}else{
var p=$(_add).closest("div.combo-p").children(".combo-panel");
$("div.combo-panel:visible").not(_ade).not(p).panel("close");
$(_add).combo("showPanel");
}
$(_add).combo("textbox").focus();
}