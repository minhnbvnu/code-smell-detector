function _9ef(_a12,_a13){
var row=find(_a12,_a13);
if(row._parentId){
return find(_a12,row._parentId);
}else{
return null;
}
}