function jscsspErrorRule(aErrorMsg)
{
  this.error = aErrorMsg ? aErrorMsg : "INVALID"; 
  this.type = kJscsspUNKNOWN_RULE;
  this.parsedCssText = null;
  this.parentStyleSheet = null;
  this.parentRule = null;
}