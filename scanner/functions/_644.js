function _644(name,val){
var _646=["switchbutton","radiobutton","checkbox"];
for(var i=0;i<_646.length;i++){
var _647=_646[i];
var cc=$(_641).find("["+_647+"Name=\""+name+"\"]");
if(cc.length){
cc[_647]("uncheck");
cc.each(function(){
if(_648($(this)[_647]("options").value,val)){
$(this)[_647]("check");
}
});
return true;
}
}
var cc=$(_641).find("input[name=\""+name+"\"][type=radio], input[name=\""+name+"\"][type=checkbox]");
if(cc.length){
cc._propAttr("checked",false);
cc.each(function(){
if(_648($(this).val(),val)){
$(this)._propAttr("checked",true);
}
});
return true;
}
return false;
}