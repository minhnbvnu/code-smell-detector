function _afa(_afb){
var _afc=$.data(_afb,"combo");
var opts=_afc.options;
var _afd=$(_afb).next();
var _afe=[];
_afd.find(".textbox-value").each(function(){
_afe.push($(this).val());
});
if(opts.multivalue){
return _afe;
}else{
return _afe.length?_afe[0].split(opts.separator):_afe;
}
}