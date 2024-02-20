function CountLF(s)
{
  var nCR = s.match( /\n/g );
  return nCR ? nCR.length + 1 : 1;
}