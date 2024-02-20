function _645(name,val){
var _649=$(_641).find("[textboxName=\""+name+"\"],[sliderName=\""+name+"\"]");
if(_649.length){
for(var i=0;i<opts.fieldTypes.length;i++){
var type=opts.fieldTypes[i];
var _64a=_649.data(type);
if(_64a){
if(_64a.options.multiple||_64a.options.range){
_649[type]("setValues",val);
}else{
_649[type]("setValue",val);
}
return true;
}
}
}
return false;
}