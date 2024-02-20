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
}