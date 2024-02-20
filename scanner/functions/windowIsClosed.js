function windowIsClosed(window)
{
  return(window == null || typeof(window) == 'undefined' || window.closed);
}