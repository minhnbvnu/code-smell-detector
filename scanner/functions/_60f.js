function _60f(_610){
var _611=$.data(_610,"filebox");
var opts=_611.options;
_611.filebox.find(".textbox-value").remove();
opts.oldValue="";
var file=$("<input type=\"file\" class=\"textbox-value\">").appendTo(_611.filebox);
file.attr("id",opts.fileboxId).attr("name",$(_610).attr("textboxName")||"");
file.attr("accept",opts.accept);
file.attr("capture",opts.capture);
if(opts.multiple){
file.attr("multiple","multiple");
}
file.change(function(){
var _612=this.value;
if(this.files){
_612=$.map(this.files,function(file){
return file.name;
}).join(opts.separator);
}
$(_610).filebox("setText",_612);
opts.onChange.call(_610,_612,opts.oldValue);
opts.oldValue=_612;
});
return file;
}