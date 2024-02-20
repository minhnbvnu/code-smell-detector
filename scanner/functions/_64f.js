function _64f(_650){
_650.reset();
var form=$(_650);
var opts=$.data(_650,"form").options;
for(var i=opts.fieldTypes.length-1;i>=0;i--){
var type=opts.fieldTypes[i];
var _651=form.find("."+type+"-f");
if(_651.length&&_651[type]){
_651[type]("reset");
}
}
form.form("validate");
}