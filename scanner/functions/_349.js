function _349(p,_34b){
var _34c=p.panel("options");
var p_t=_34c.tab.find("a.tabs-inner");
var _34b=_34b?_34b:(parseInt(_34c.tabWidth||opts.tabWidth||undefined));
if(_34b){
p_t._outerWidth(_34b);
}else{
p_t.css("width","");
}
p_t._outerHeight(opts.tabHeight);
p_t.css("lineHeight",p_t.height()+"px");
p_t.find(".easyui-fluid:visible").triggerHandler("_resize");
}