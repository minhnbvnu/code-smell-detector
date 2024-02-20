function getElementsByXPath(xpath, context)
{
  var nodes = [];

  try {
    var result = document.evaluate(xpath, (context || document), null, 
      XPathResult.ANY_TYPE, null);

    for (var item = result.iterateNext(); item; item = result.iterateNext())
      nodes.push(item);
  }
  catch (exc)
  {
    // Invalid xpath expressions make their way here sometimes. If that happens,
    // we still want to return an empty set without an exception.
  }

  return nodes;
}