function _655(_65d,_65e){
var opts=$.data(_65d,"form").options;
opts.novalidate=_65e;
$(_65d).find(".validatebox-text:not(:disabled)").validatebox(_65e?"disableValidation":"enableValidation");
}