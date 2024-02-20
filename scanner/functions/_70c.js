function _70c(_70d){
var _70e=$.data(_70d,"datagrid");
var opts=_70e.options;
var dc=_70e.dc;
var wrap=_70e.panel;
if(!wrap.is(":visible")){
return;
}
var _70f=wrap.width();
var _710=wrap.height();
var view=dc.view;
var _711=dc.view1;
var _712=dc.view2;
var _713=_711.children("div.datagrid-header");
var _714=_712.children("div.datagrid-header");
var _715=_713.find("table");
var _716=_714.find("table");
view.width(_70f);
var _717=_713.children("div.datagrid-header-inner").show();
_711.width(_717.find("table").width());
if(!opts.showHeader){
_717.hide();
}
_712.width(_70f-_711._outerWidth());
_711.children()._outerWidth(_711.width());
_712.children()._outerWidth(_712.width());
var all=_713.add(_714).add(_715).add(_716);
all.css("height","");
var hh=Math.max(_715.height(),_716.height());
all._outerHeight(hh);
view.children(".datagrid-empty").css("top",hh+"px");
dc.body1.add(dc.body2).children("table.datagrid-btable-frozen").css({position:"absolute",top:dc.header2._outerHeight()});
var _718=dc.body2.children("table.datagrid-btable-frozen")._outerHeight();
var _719=_718+_714._outerHeight()+_712.children(".datagrid-footer")._outerHeight();
wrap.children(":not(.datagrid-view,.datagrid-mask,.datagrid-mask-msg)").each(function(){
_719+=$(this)._outerHeight();
});
var _71a=wrap.outerHeight()-wrap.height();
var _71b=wrap._size("minHeight")||"";
var _71c=wrap._size("maxHeight")||"";
_711.add(_712).children("div.datagrid-body").css({marginTop:_718,height:(isNaN(parseInt(opts.height))?"":(_710-_719)),minHeight:(_71b?_71b-_71a-_719:""),maxHeight:(_71c?_71c-_71a-_719:"")});
view.height(_712.height());
}