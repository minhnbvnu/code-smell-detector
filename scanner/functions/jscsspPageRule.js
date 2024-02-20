function jscsspPageRule()
{
  this.type = kJscsspPAGE_RULE;
  this.parsedCssText = null;
  this.pageSelector = null;
  this.declarations = [];
  this.parentStyleSheet = null;
  this.parentRule = null;
}