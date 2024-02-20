function _aad(_aae){
var opts=$.data(_aae,"datalist").options;
$(_aae).datagrid($.extend({},opts,{cls:"datalist"+(opts.lines?" datalist-lines":""),frozenColumns:(opts.frozenColumns&&opts.frozenColumns.length)?opts.frozenColumns:(opts.checkbox?[[{field:"_ck",checkbox:true}]]:undefined),columns:(opts.columns&&opts.columns.length)?opts.columns:[[{field:opts.textField,width:"100%",formatter:function(_aaf,row,_ab0){
return opts.textFormatter?opts.textFormatter(_aaf,row,_ab0):_aaf;
}}]]}));
}