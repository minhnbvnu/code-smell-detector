function _ae2(e){
var _ae3=e.data.target;
var _ae4=$.data(_ae3,"combo");
var opts=_ae4.options;
if(!opts.editable){
_adc(_ae3);
}else{
var p=$(_ae3).closest("div.combo-p").children(".combo-panel");
$("div.combo-panel:visible").not(p).each(function(){
var _ae5=$(this).combo("combo");
if(_ae5!=_ae3){
_ae0(_ae5);
}
});
}
}