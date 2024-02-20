function _64b(_64c){
$("input,select,textarea",_64c).each(function(){
if($(this).hasClass("textbox-value")){
return;
}
var t=this.type,tag=this.tagName.toLowerCase();
if(t=="text"||t=="hidden"||t=="password"||tag=="textarea"){
this.value="";
}else{
if(t=="file"){
var file=$(this);
if(!file.hasClass("textbox-value")){
var _64d=file.clone().val("");
_64d.insertAfter(file);
if(file.data("validatebox")){
file.validatebox("destroy");
_64d.validatebox();
}else{
file.remove();
}
}
}else{
if(t=="checkbox"||t=="radio"){
this.checked=false;
}else{
if(tag=="select"){
this.selectedIndex=-1;
}
}
}
}
});
var tmp=$();
var form=$(_64c);
var opts=$.data(_64c,"form").options;
for(var i=0;i<opts.fieldTypes.length;i++){
var type=opts.fieldTypes[i];
var _64e=form.find("."+type+"-f").not(tmp);
if(_64e.length&&_64e[type]){
_64e[type]("clear");
tmp=tmp.add(_64e);
}
}
form.form("validate");
}