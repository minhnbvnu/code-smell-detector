function getParameterHash()
{
  var hashIndex = window.location.href.indexOf("#");
  if (hashIndex >= 0) {
    return parameterStringToHash(window.location.href.substring(hashIndex + 1));
  } else {
    return {};
  } 
}