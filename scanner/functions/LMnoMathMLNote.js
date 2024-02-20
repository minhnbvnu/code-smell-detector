function LMnoMathMLNote() {
  var nd = LMcreateElementXHTML("h3");
  nd.setAttribute("align","center")
  nd.appendChild(LMcreateElementXHTML("p"));
  nd.appendChild(document.createTextNode("To view the "));
  var an = LMcreateElementXHTML("a");
  an.appendChild(document.createTextNode("LaTeXMathML"));
  an.setAttribute("href","http://www.maths.nott.ac.uk/personal/drw/lm.html");
  nd.appendChild(an);
  nd.appendChild(document.createTextNode(" notation use Internet Explorer 6+")); 
  an = LMcreateElementXHTML("a");
  an.appendChild(document.createTextNode("MathPlayer"));
  an.setAttribute("href","http://www.dessci.com/en/products/mathplayer/download.htm");
  nd.appendChild(an);
  nd.appendChild(document.createTextNode(" or Netscape/Mozilla/Firefox"));
  nd.appendChild(LMcreateElementXHTML("p"));
  return nd;
}