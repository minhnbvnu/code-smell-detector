function LatexToMathML(LatexStr) {
    //process Symbols if not processed before
    if (!LMtranslated) {
        LMinitSymbols();
    }
    //create element to contain the latex & process it
    var span = document.createElement("span");
    span.innerText = "$" + LatexStr.replace(/\\/g, "\\") + "$";
    LMprocessNode(span, false);

    return span.innerHTML;
}