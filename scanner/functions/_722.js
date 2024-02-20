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
}