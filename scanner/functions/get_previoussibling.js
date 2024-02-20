function get_previoussibling(n)
{
  var x = n.previousSibling;

  if(x)
  {
    while (x.nodeType != 1)
    {
      x = x.previousSibling;
    }
  }
  return x;
}