function AMTparseAMtoTeX(str) {
 AMnestingDepth = 0;
  str = str.replace(/(&nbsp;|\u00a0|&#160;)/g,"");
  str = str.replace(/&gt;/g,">");
  str = str.replace(/&lt;/g,"<");
  if (str.match(/\S/)==null) {
	  return "";
  }
  return AMTparseExpr(str.replace(/^\s+/g,""),false)[0];
}