function _6f8(_6f9){
var _6fa=$.data(_6f9,"datagrid");
var opts=_6fa.options;
var _6fb=_6fa.panel;
var dc=_6fa.dc;
var ss=null;
if(opts.sharedStyleSheet){
ss=typeof opts.sharedStyleSheet=="boolean"?"head":opts.sharedStyleSheet;
}else{
ss=_6fb.closest("div.datagrid-view");
if(!ss.length){
ss=dc.view;
}
}
var cc=$(ss);
var _6fc=$.data(cc[0],"ss");
if(!_6fc){
_6fc=$.data(cc[0],"ss",{cache:{},dirty:[]});
}
return {add:function(_6fd){
var ss=["<style type=\"text/css\" easyui=\"true\">"];
for(var i=0;i<_6fd.length;i++){
_6fc.cache[_6fd[i][0]]={width:_6fd[i][1]};
}
var _6fe=0;
for(var s in _6fc.cache){
var item=_6fc.cache[s];
item.index=_6fe++;
ss.push(s+"{width:"+item.width+"}");
}
ss.push("</style>");
$(ss.join("\n")).appendTo(cc);
cc.children("style[easyui]:not(:last)").remove();
},getRule:function(_6ff){
var _700=cc.children("style[easyui]:last")[0];
var _701=_700.styleSheet?_700.styleSheet:(_700.sheet||document.styleSheets[document.styleSheets.length-1]);
var _702=_701.cssRules||_701.rules;
return _702[_6ff];
},set:function(_703,_704){
var item=_6fc.cache[_703];
if(item){
item.width=_704;
var rule=this.getRule(item.index);
if(rule){
rule.style["width"]=_704;
}
}
},remove:function(_705){
var tmp=[];
for(var s in _6fc.cache){
if(s.indexOf(_705)==-1){
tmp.push([s,_6fc.cache[s].width]);
}
}
_6fc.cache={};
this.add(tmp);
},dirty:function(_706){
if(_706){
_6fc.dirty.push(_706);
}
},clean:function(){
for(var i=0;i<_6fc.dirty.length;i++){
this.remove(_6fc.dirty[i]);
}
_6fc.dirty=[];
}};
}