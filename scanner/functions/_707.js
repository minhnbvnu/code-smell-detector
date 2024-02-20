function _707(_7b2){
var _7b3=dc.view.find("div.datagrid-header td[field=\""+_7b2+"\"] div.datagrid-cell");
_7b3.css("width","");
var col=$(_7ad).datagrid("getColumnOption",_7b2);
col.width=undefined;
col.boxWidth=undefined;
col.auto=true;
$(_7ad).datagrid("fixColumnSize",_7b2);
var _7b4=Math.max(_7b5("header"),_7b5("allbody"),_7b5("allfooter"))+1;
_7b3._outerWidth(_7b4-1);
col.width=_7b4;
col.boxWidth=parseInt(_7b3[0].style.width);
col.deltaWidth=_7b4-col.boxWidth;
_7b3.css("width","");
$(_7ad).datagrid("fixColumnSize",_7b2);
opts.onResizeColumn.call(_7ad,_7b2,col.width);
function _7b5(type){
var _7b6=0;
if(type=="header"){
_7b6=_7b7(_7b3);
}else{
opts.finder.getTr(_7ad,0,type).find("td[field=\""+_7b2+"\"] div.datagrid-cell").each(function(){
var w=_7b7($(this));
if(_7b6<w){
_7b6=w;
}
});
}
return _7b6;
function _7b7(cell){
return cell.is(":visible")?cell._outerWidth():tmp.html(cell.html())._outerWidth();
};
};
}