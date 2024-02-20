function _382(_387,_388,_389){
var tabs=$.data(_387,"tabs").tabs;
var tab=null;
if(typeof _388=="number"){
if(_388>=0&&_388<tabs.length){
tab=tabs[_388];
if(_389){
tabs.splice(_388,1);
}
}
}else{
var tmp=$("<span></span>");
for(var i=0;i<tabs.length;i++){
var p=tabs[i];
tmp.html(p.panel("options").title);
var _38a=tmp.text();
tmp.html(_388);
_388=tmp.text();
if(_38a==_388){
tab=p;
if(_389){
tabs.splice(i,1);
}
break;
}
}
tmp.remove();
}
return tab;
}