function _618(_619){
var _61a=$.data(_619,"searchbox");
var opts=_61a.options;
var _61b=$.extend(true,[],opts.icons);
_61b.push({iconCls:"searchbox-button",handler:function(e){
var t=$(e.data.target);
var opts=t.searchbox("options");
opts.searcher.call(e.data.target,t.searchbox("getValue"),t.searchbox("getName"));
}});
_61c();
var _61d=_61e();
$(_619).addClass("searchbox-f").textbox($.extend({},opts,{icons:_61b,buttonText:(_61d?_61d.text:"")}));
$(_619).attr("searchboxName",$(_619).attr("textboxName"));
_61a.searchbox=$(_619).next();
_61a.searchbox.addClass("searchbox");
_61f(_61d);
function _61c(){
if(opts.menu){
_61a.menu=$(opts.menu).menu();
var _620=_61a.menu.menu("options");
var _621=_620.onClick;
_620.onClick=function(item){
_61f(item);
_621.call(this,item);
};
}else{
if(_61a.menu){
_61a.menu.menu("destroy");
}
_61a.menu=null;
}
};
function _61e(){
if(_61a.menu){
var item=_61a.menu.children("div.menu-item:first");
_61a.menu.children("div.menu-item").each(function(){
var _622=$.extend({},$.parser.parseOptions(this),{selected:($(this).attr("selected")?true:undefined)});
if(_622.selected){
item=$(this);
return false;
}
});
return _61a.menu.menu("getItem",item[0]);
}else{
return null;
}
};
function _61f(item){
if(!item){
return;
}
$(_619).textbox("button").menubutton({text:item.text,iconCls:(item.iconCls||null),menu:_61a.menu,menuAlign:opts.buttonAlign,plain:false});
_61a.searchbox.find("input.textbox-value").attr("name",item.name||item.text);
$(_619).searchbox("resize");
};
}