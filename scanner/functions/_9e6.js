function _9e6(_9ec,row,_9ed){
var flag=_9ed?1:0;
_9e8(_9ec,row,flag);
$.easyui.forEach(row.children||[],true,function(r){
_9e8(_9ec,r,flag);
});
}