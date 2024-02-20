function _652(_653){
var _654=$.data(_653,"form").options;
$(_653).unbind(".form");
if(_654.ajax){
$(_653).bind("submit.form",function(){
setTimeout(function(){
_629(_653,_654);
},0);
return false;
});
}
$(_653).bind("_change.form",function(e,t){
if($.inArray(t,_654.dirtyFields)==-1){
_654.dirtyFields.push(t);
}
_654.onChange.call(this,t);
}).bind("change.form",function(e){
var t=e.target;
if(!$(t).hasClass("textbox-text")){
if($.inArray(t,_654.dirtyFields)==-1){
_654.dirtyFields.push(t);
}
_654.onChange.call(this,t);
}
});
_655(_653,_654.novalidate);
}