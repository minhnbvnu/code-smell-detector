function _973(css,cls){
var _979="";
var _97a="";
if(typeof css=="string"){
_97a=css;
}else{
if(css){
_979=css["class"]||"";
_97a=css["style"]||"";
}
}
return "class=\""+cls+(_979?" "+_979:"")+"\" "+"style=\""+_97a+"\"";
}