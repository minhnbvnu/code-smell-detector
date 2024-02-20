function _ba4(_ba5){
var _ba6=$.data(_ba5,"combotree");
_ba6.remainText=false;
$(_ba5).combotree("setValues",$(_ba5).combotree("getValues"));
$(_ba5).combotree("hidePanel");
}