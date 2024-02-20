function _a9c(_a9e,rows){
var rr=[];
for(var i=0;i<rows.length;i++){
var row=rows[i];
if(row._parentId==_a9e){
rr.push(row);
rows.splice(i,1);
i--;
}
}
return rr;
}