function FilterRepeatingGradientForOutput(aValue, aEngine)
{
  if (aEngine == "generic")
    return aValue.substr(5);

  else if (aEngine == "webkit")
    return aValue.replace( /\-moz\-/g , "-webkit-")

  return "";
}