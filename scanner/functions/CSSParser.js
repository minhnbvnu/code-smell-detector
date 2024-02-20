function CSSParser(aString)
{
  this.mToken = null;
  this.mLookAhead = null;
  this.mScanner = new CSSScanner(aString);

  this.mPreserveWS = true;
  this.mPreserveComments = true;

  this.mPreservedTokens = [];
  
  this.mError = null;
}