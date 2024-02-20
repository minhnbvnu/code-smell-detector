function _274(_275,type){
if(!_275){
return;
}
var _276=_275==$("body")[0];
var s=$(_275).find("div.panel:visible,div.accordion:visible,div.tabs-container:visible,div.layout:visible,.easyui-fluid:visible").filter(function(_277,el){
var p=$(el).parents(".panel-"+type+":first");
return _276?p.length==0:p[0]==_275;
});
s.each(function(){
$(this).triggerHandler("_resize",[all||false]);
});
}