function _5fd(e){
if(e.metaKey||e.ctrlKey){
return;
}
var _5fe=e.data.target;
var opts=$(_5fe).maskedbox("options");
var _5ff=[9,13,35,36,37,39];
if($.inArray(e.keyCode,_5ff)!=-1){
return true;
}
if(e.keyCode>=96&&e.keyCode<=105){
e.keyCode-=48;
}
var c=String.fromCharCode(e.keyCode);
if(e.keyCode>=65&&e.keyCode<=90&&!e.shiftKey){
c=c.toLowerCase();
}else{
if(e.keyCode==189){
c="-";
}else{
if(e.keyCode==187){
c="+";
}else{
if(e.keyCode==190){
c=".";
}
}
}
}
if(e.keyCode==8){
_5f1(_5fe,true);
}else{
if(e.keyCode==46){
_5f1(_5fe,false);
}else{
_5e9(_5fe,c);
}
}
return false;
}