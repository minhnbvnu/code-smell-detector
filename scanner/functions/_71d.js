function _71d(_71e,_71f,_720){
var rows=$.data(_71e,"datagrid").data.rows;
var opts=$.data(_71e,"datagrid").options;
var dc=$.data(_71e,"datagrid").dc;
var tmp=$("<tr class=\"datagrid-row\" style=\"position:absolute;left:-999999px\"></tr>").appendTo("body");
var _721=tmp.outerHeight();
tmp.remove();
if(!dc.body1.is(":empty")&&(!opts.nowrap||opts.autoRowHeight||_720)){
if(_71f!=undefined){
var tr1=opts.finder.getTr(_71e,_71f,"body",1);
var tr2=opts.finder.getTr(_71e,_71f,"body",2);
_722(tr1,tr2);
}else{
var tr1=opts.finder.getTr(_71e,0,"allbody",1);
var tr2=opts.finder.getTr(_71e,0,"allbody",2);
_722(tr1,tr2);
if(opts.showFooter){
var tr1=opts.finder.getTr(_71e,0,"allfooter",1);
var tr2=opts.finder.getTr(_71e,0,"allfooter",2);
_722(tr1,tr2);
}
}
}
_70c(_71e);
if(opts.height=="auto"){
var _723=dc.body1.parent();
var _724=dc.body2;
var _725=_726(_724);
var _727=_725.height;
if(_725.width>_724.width()){
_727+=18;
}
_727-=parseInt(_724.css("marginTop"))||0;
_723.height(_727);
_724.height(_727);
dc.view.height(dc.view2.height());
}
dc.body2.triggerHandler("scroll");
function _722(trs1,trs2){
for(var i=0;i<trs2.length;i++){
var tr1=$(trs1[i]);
var tr2=$(trs2[i]);
tr1.css("height","");
tr2.css("height","");
var _728=Math.max(tr1.outerHeight(),tr2.outerHeight());
if(_728!=_721){
_728=Math.max(_728,_721)+1;
tr1.css("height",_728);
tr2.css("height",_728);
}
}
};
function _726(cc){
var _729=0;
var _72a=0;
$(cc).children().each(function(){
var c=$(this);
if(c.is(":visible")){
_72a+=c._outerHeight();
if(_729<c._outerWidth()){
_729=c._outerWidth();
}
}
});
return {width:_729,height:_72a};
};
}