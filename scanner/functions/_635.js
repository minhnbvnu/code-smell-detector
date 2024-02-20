function _635(_636){
var form=$(_631);
if(opts.url){
form.attr("action",opts.url);
}
var t=form.attr("target"),a=form.attr("action");
form.attr("target",_633);
var _637=$();
try{
for(var n in _636){
var _638=$("<input type=\"hidden\" name=\""+n+"\">").val(_636[n]).appendTo(form);
_637=_637.add(_638);
}
_639();
form[0].submit();
}
finally{
form.attr("action",a);
t?form.attr("target",t):form.removeAttr("target");
_637.remove();
}
}