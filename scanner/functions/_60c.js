function _60c(_60d){
var _60e=$.data(_60d,"filebox");
var opts=_60e.options;
opts.fileboxId="filebox_file_id_"+(++_60b);
$(_60d).addClass("filebox-f").textbox(opts);
$(_60d).textbox("textbox").attr("readonly","readonly");
_60e.filebox=$(_60d).next().addClass("filebox");
var file=_60f(_60d);
var btn=$(_60d).filebox("button");
if(btn.length){
$("<label class=\"filebox-label\" for=\""+opts.fileboxId+"\"></label>").appendTo(btn);
if(btn.linkbutton("options").disabled){
file._propAttr("disabled",true);
}else{
file._propAttr("disabled",false);
}
}
}