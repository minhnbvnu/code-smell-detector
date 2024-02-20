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
}