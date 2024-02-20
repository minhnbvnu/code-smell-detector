function _a68(_a69,_a6a,_a6b){
var _a6c=$(_a62).treegrid("getParent",_a6b[0][opts.idField]);
var _a6d=(_a6c?_a6c.children.length:$(_a62).treegrid("getRoots").length)-_a6b.length;
var _a6e=["<table class=\"datagrid-btable\" cellspacing=\"0\" cellpadding=\"0\" border=\"0\"><tbody>"];
for(var i=0;i<_a6b.length;i++){
var row=_a6b[i];
if(row.state!="open"&&row.state!="closed"){
row.state="open";
}
var css=opts.rowStyler?opts.rowStyler.call(_a62,row):"";
var cs=this.getStyleValue(css);
var cls="class=\"datagrid-row "+(_a6d++%2&&opts.striped?"datagrid-row-alt ":" ")+cs.c+"\"";
var _a6f=cs.s?"style=\""+cs.s+"\"":"";
var _a70=_a66+"-"+(_a69?1:2)+"-"+row[opts.idField];
_a6e.push("<tr id=\""+_a70+"\" node-id=\""+row[opts.idField]+"\" "+cls+" "+_a6f+">");
_a6e=_a6e.concat(view.renderRow.call(view,_a62,_a65,_a69,_a6a,row));
_a6e.push("</tr>");
if(row.children&&row.children.length){
var tt=_a68.call(this,_a69,_a6a+1,row.children);
var v=row.state=="closed"?"none":"block";
_a6e.push("<tr class=\"treegrid-tr-tree\"><td style=\"border:0px\" colspan="+(_a65.length+(opts.rownumbers?1:0))+"><div style=\"display:"+v+"\">");
_a6e=_a6e.concat(tt);
_a6e.push("</div></td></tr>");
}
}
_a6e.push("</tbody></table>");
return _a6e;
}