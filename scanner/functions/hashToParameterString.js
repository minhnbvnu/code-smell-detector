function hashToParameterString(associativeArray)
{
  var parameterString = ""
  for (key in associativeArray)
  {
    if( parameterString === "" )
    {
      parameterString = encodeURIComponent(key);
      parameterString += "=" + encodeURIComponent(associativeArray[key]);
    } else {
      parameterString += "&" + encodeURIComponent(key);
      parameterString += "=" + encodeURIComponent(associativeArray[key]);
    }
  }
  //padding for URL shorteners
  parameterString += "&p=p";
  
  return parameterString;
}